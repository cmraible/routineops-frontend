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
import { fetchTaskLayers } from '../taskLayers/taskLayersSlice';
import { fetchTasks } from '../tasks/tasksSlice';
import { selectAllUsers } from '../users/usersSlice';
import TaskInstanceItem from './TaskInstanceItem';
import { fetchTaskInstances, selectAllTaskInstances } from './taskInstancesSlice';

const Todo = () => {
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

  const taskInstances = useSelector(selectAllTaskInstances)
    .filter((instance) => {
      const now = DateTime.local()
      if (!filters.completed && instance.completed) {
        return false;
      }
      if (!filters.past_due && !instance.completed && DateTime.fromISO(instance.due) < now) {
        return false;
      }
      if (filters.users.length > 0) {
        if (!filters.users.includes(instance.assignee)) {
          return false;
        }
      }
      if (headerValue === 'Today' && DateTime.fromISO(instance.due) > DateTime.local().endOf('day')) {
        return false;
      }
      if (headerValue === 'This Week' && DateTime.fromISO(instance.due) > DateTime.local().endOf('week')) {
        return false;
      }
      if (headerValue === 'This Month' && DateTime.fromISO(instance.due) > DateTime.local().endOf('month')) {
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
      const taskAction = await dispatch(fetchTasks());
      const taskLayerAction = await dispatch(fetchTaskLayers());
      const taskInstanceAction = await dispatch(fetchTaskInstances());
      if (fetchTasks.fulfilled.match(taskAction) && fetchTaskLayers.fulfilled.match(taskLayerAction) && fetchTaskInstances.fulfilled.match(taskInstanceAction) && fetchAccount.fulfilled.match(accountAction)) {
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
    if (taskInstances.length > 0) {
      // Display list of task instances
      var items = []
      taskInstances.forEach((taskInstance) => {
        items.push(<TaskInstanceItem id={taskInstance.id} key={taskInstance.id} />)
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
    content = <Message type="error" message="Unable to fetch task instances." />
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
      <Box flex="grow" direction="row" height="100%">
        <Box fill="horizontal" flex style={{overflowY: "scroll"}} height="100%">
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

export default Todo;