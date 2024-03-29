import { push } from 'connected-react-router';
import { group } from 'd3-array';
import { Box, Button, CheckBox, Collapsible, Form, FormField, Heading, InfiniteScroll, ResponsiveContext, Select, Text } from 'grommet';
import { Add, CircleInformation, Filter } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/Page';
import { selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import UserMenu from '../users/UserMenu';
import { selectAllUsers } from '../users/usersSlice';
import TaskItem from './TaskItem';
import { fetchTasks, selectFilteredTasks } from './tasksSlice';
import Spinner from '../../components/Spinner';
import Confetti from 'react-confetti'

const TaskList = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectLoggedInUser);
  const account = useSelector(selectUserAccount);
  const allUsers = useSelector(selectAllUsers);

  const [status, setStatus] = useState('idle')
  const [confetti, setConfetti] = useState(false)
  const [headerValue, setHeaderValue] = useState('All Tasks');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    users: [user.id],
    completed: false
  });

  useEffect(() => {
    const fetch = async () => {
      setStatus('pending');
      await dispatch(fetchTasks);
      setStatus('idle');
    }
    fetch();
  }, [dispatch]);
 
  const calculateGroup = (task) => {
    const due = DateTime.fromISO(task.due)
    if (task.completed) {
      return "Completed"
    } else if (DateTime.local() > due) {
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

  const tasks = useSelector((state) => selectFilteredTasks(state, filters)).filter((task) => {
    const due = DateTime.fromISO(task.due);
    if(headerValue === 'Today') {
      if (DateTime.local().hasSame(due, 'day')) {
        return true;
      } else {
        return false;
      }
    } else if (headerValue === 'This Week') {
      if (DateTime.local().endOf('week') > due) {
        return true;
      } else {
        return false;
      }
    } else if (headerValue === 'This Month') {
      if (DateTime.local().endOf('month') > due) {
        return true;
      } else {
        return false;
      }
    } else {
      return true
    }
  });

  useEffect(() => {
    if (tasks.length === 0) {
      setConfetti(true)
      setTimeout(() => {
        setConfetti(false)
      }, 5000);
    }
  }, [tasks.length])

  let content
  if (status === 'pending') {
    content = <Spinner />
  } else if (tasks.length > 0) {
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
                    style={{position: "sticky", top: (size === "small") ? 45 : 52, zIndex: 1}}
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
      <>
        {confetti && <Confetti style={{zIndex: 99}} />}
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">Congratulations, you're all done!</Text>
          <Button size="large" icon={<Add/>} label="Add Routine" onClick={() => dispatch(push('/routines/add'))} />
        </Box>
      </>
    )
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
      userMenu={<UserMenu mobile user={user} />}
      action={{
        icon: <Filter />,
        primary: false,
        onClick: () => setShowFilters(!showFilters)
      }}
    >
      <Box direction="row" flex={false} fill="vertical">
        <Box overflow="visible" flex fill="vertical">
          {content}
        </Box>
        <Collapsible direction="horizontal" open={showFilters}>
          <Box width="medium" fill="vertical" elevation="small" flex background="background-contrast" style={{position: "sticky", top: 0, zIndex: 5}}>
            <Box style={{position: 'fixed'}} width="medium">
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
                        <CheckBox name="completed" label="Show completed tasks" />
                </Box>
              </Form>
            </Box>
            

          </Box>
        </Collapsible>
      </Box>
    </Page>
  )

};

export default TaskList;