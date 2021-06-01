import { push } from 'connected-react-router';
import { Box, Button, CheckBox, Collapsible, Form, FormField, Heading, Select, Text } from 'grommet';
import { Add, CircleInformation, Filter } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { fetchAccount, selectUserAccount } from '../accounts/accountsSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { fetchLayers } from '../layers/layersSlice';
import { fetchRoutines } from '../routines/routinesSlice';
import { selectAllUsers } from '../users/usersSlice';
import TaskItem from './TaskItem';
import { fetchTasks, selectAllTasks } from './tasksSlice';

const TaskList = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectLoggedInUser);
  const account = useSelector(selectUserAccount);
  const allUsers = useSelector(selectAllUsers);

  const [requestStatus, setRequestStatus] = useState('idle');
  const [showFilters, setShowFilters] = useState(false);
  const [headerValue, setHeaderValue] = useState('Today')
  const [filters, setFilters] = useState({
    users: [user.id],
    completed: true,
    past_due: true
  });

  const tasks = useSelector(selectAllTasks)
    .filter((task) => {
      const now = DateTime.local()
      if (!filters.completed && task.completed) {
        return false;
      }
      if (task.completed && DateTime.fromISO(task.due) < now) {
        return false;
      }
      if (!filters.past_due && !task.completed && DateTime.fromISO(task.due) < now) {
        return false;
      }
      if (filters.users.length > 0) {
        if (!filters.users.includes(task.assignee)) {
          return false;
        }
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
      if (fetchRoutines.fulfilled.match(routineAction) && fetchLayers.fulfilled.match(layerAction) && fetchTasks.fulfilled.match(taskAction) && fetchAccount.fulfilled.match(accountAction)) {
        setRequestStatus('succeeded')
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch, user.account]);

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = <Spinner pad="large" size="large" color="status-unknown" />
  } else if (requestStatus === 'succeeded') {
    if (tasks.length > 0) {
      // Display list of tasks
      var items = []
      tasks.forEach((task) => {
        items.push(<TaskItem id={task.id} key={task.id} />)
      });
      content = <Box>{items}</Box>
    } else {
      // Display empty message
      content = (
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">You don't have any tasks yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Task" onClick={() => dispatch(push('/tasks/add'))} />
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    // Display an error message
    content = <Message type="error" message="Unable to fetch tasks." />
  }

  const header = (
    <Select
      options={["Today", "This Week", "This Month"]}
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
      action={{
        icon: <Filter />,
        primary: false,
        onClick: () => setShowFilters(!showFilters)
      }}
    >
      <Box flex="grow" direction="row" style={{overflowY: "scroll"}} fill="vertical">
        <Box fill="horizontal">
          <Box flex={false}>
            {content}
          </Box>
        </Box>
        <Collapsible direction="horizontal" open={showFilters}>
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
        </Collapsible>
      </Box>
    </Page>
  )

};

export default TaskList;