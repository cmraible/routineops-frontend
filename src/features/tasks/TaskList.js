import { push } from 'connected-react-router';
import { group } from 'd3-array';
import { Box, Button, Heading, InfiniteScroll, ResponsiveContext, Select, Text } from 'grommet';
import { Add, CircleInformation } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { fetchAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchLayers } from '../layers/layersSlice';
import { fetchRoutines } from '../routines/routinesSlice';
import { fetchRoles } from '../roles/rolesSlice';
import TaskItem from './TaskItem';
import { fetchTasks, selectUserTasks } from './tasksSlice';

const TaskList = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectLoggedInUser);

  const [requestStatus, setRequestStatus] = useState('idle');
  const [headerValue, setHeaderValue] = useState('All Tasks')

  const tasks = useSelector(selectUserTasks)
    .filter((task) => {
      const now = DateTime.local()
      if (task.completed && DateTime.fromISO(task.due) < now) {
        return false;
      }
      if (headerValue === 'Today' && DateTime.fromISO(task.due) > DateTime.local().endOf('day')) {
        return false;
      }
      if (headerValue === 'This Week' && DateTime.fromISO(task.due) > DateTime.local().endOf('week')) {
        return false;
      }
      if (headerValue === 'This Month' && DateTime.fromISO(task.due) > DateTime.local().endOf('month')) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
    const aDue = DateTime.fromISO(a.due)
    const bDue = DateTime.fromISO(b.due)
    return aDue < bDue ? -1 : aDue > bDue ? 1 : 0;
  });

  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      const accountAction = await dispatch(fetchAccount(user.account));
      const routineAction = await dispatch(fetchRoutines());
      const layerAction = await dispatch(fetchLayers());
      const taskAction = await dispatch(fetchTasks());
      const roleAction = await dispatch(fetchRoles());
      if (fetchRoutines.fulfilled.match(routineAction) && fetchLayers.fulfilled.match(layerAction) && fetchTasks.fulfilled.match(taskAction) && fetchAccount.fulfilled.match(accountAction) && fetchRoles.fulfilled.match(roleAction)) {
        setRequestStatus('succeeded')
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch, user.account]);

  const calculateGroup = (task) => {
    const due = DateTime.fromISO(task.due)
    if (DateTime.local() > due) {
      return "Past Due"
    } else if (DateTime.local().hasSame(due, 'day')) {
      return "Today"
    } else if (DateTime.local().plus({days: 1}).hasSame(due, 'day')) {
      return "Tomorrow"
    } else if (DateTime.local().endOf('week') > due) {
      return due.weekdayLong
    } else if (DateTime.local().endOf('week').plus({weeks: 1}) > due) {
      return `Next week`
    } else if (DateTime.local().endOf('month') > due) {
      return "Later this month"
    } else {
      return `${due.monthLong} ${due.year}`
    }
  }

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = <Spinner pad="large" size="large" color="status-unknown" />
  } else if (requestStatus === 'succeeded') {
    if (tasks.length > 0) {
      // Display list of tasks
      content = (
        <ResponsiveContext.Consumer>
          {
            size => {
              return (
                <InfiniteScroll items={Array.from(group(tasks, d => calculateGroup(d)))}>
            { (group, index) => {
              return (
                <Box flex={false} key={index} >
                  <Box 
                      fill="horizontal" 
                      background="background-contrast" 
                      pad={{horizontal: "small"}}
                      flex={false}
                      style={{position: "sticky", top: (size === "small") ? 45 : 52}}
                    >
                      <Text weight="bold" size="large">{group[0]}</Text>
                    </Box>
                    {
                      group[1].map((task) => {
                        return <TaskItem id={task.id} key={task.id} />
                      })
                    }
                </Box>
              )
            }}
          </InfiniteScroll>
              )
            }
          }
          
        </ResponsiveContext.Consumer>
        
      )
    } else {
      // Display empty message
      content = (
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">You don't have any routines yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Routine" onClick={() => dispatch(push('/routines/add'))} />
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    // Display an error message
    content = <Message type="error" message="Unable to fetch tasks." />
  }

  const header = (
    <Select
      options={["All Tasks", "Today", "This Week", "This Month"]}
      plain
      value={headerValue}
      onChange={({option}) => setHeaderValue(option)}
      valueLabel={
        <Heading
          style={{whiteSpace: 'nowrap'}}
          size="small"
          margin={{vertical: "none"}}
        >{headerValue}</Heading>}
    />
  )


  return (
    <Page
      title="Todo"
      header={header}
      // action={{
      //   icon: <Filter />,
      //   primary: false,
      //   onClick: () => setShowFilters(!showFilters)
      // }}
    >
      <Box>
        <Box overflow="visible">
          {content}
        </Box>
        {/* <Collapsible direction="horizontal" open={showFilters}>
          <Box width="medium" fill="vertical" background="background-contrast" style={{position: "sticky", top: 0}}>
            <Box border={{bottom: "small"}} pad="small">
              <Heading size="xsmall" margin="xsmall" level={3}>Filters</Heading>
            </Box>
            <Form
              value={filters}
              onChange={nextValue => setFilters(nextValue)}
            >
              <Box pad="small" gap="medium">
                  {
                    (account && account.type === 'Team' && (
                      <FormField name="user" label="Assignee" fill>
                        <Select
                          name="users"
                          options={allUsers}
                          multiple
                          labelKey={(option) => option.first_name ? `${option.first_name} ${option.last_name}` : option.email}
                          valueKey={{key: 'id', reduce: true}}
                          placeholder="All Assignees"
                        />
                      </FormField>
                    ))
                  }
                  <CheckBox name="completed" label={<Text style={{whiteSpace: 'nowrap'}}>Show completed tasks</Text>} />
                  <CheckBox name="past_due" label={<Text style={{whiteSpace: 'nowrap'}}>Show past due tasks</Text>} />
              </Box>
            </Form>

          </Box>
        </Collapsible> */}
      </Box>
    </Page>
  )

};

export default TaskList;