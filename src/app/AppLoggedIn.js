import { Box } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Account from '../features/accounts/Account';
// import Team from '../containers/Team';
import RoleDetail from '../features/roles/RoleDetail';
import RoleEdit from '../features/roles/RoleEdit';
import RoleList from '../features/roles/RoleList';
import TaskInstance from '../features/taskInstances/TaskInstance';
import Today from '../features/taskInstances/Today';
import TaskAdd from '../features/tasks/TaskAdd';
import TaskDetail from '../features/tasks/TaskDetail';
import TaskEdit from '../features/tasks/TaskEdit';
import TaskList from '../features/tasks/TaskList';
import UserAdd from '../features/users/UserAdd';
import UserDetail from '../features/users/UserDetail';
import UserEdit from '../features/users/UserEdit';
import UserList from '../features/users/UserList';
import AppNavigation from './AppNavigation';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { fetchAccount } from '../features/accounts/accountsSlice';

const AppLoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    dispatch(fetchAccount(user.account))
  }, [dispatch, user.account]);

  return (
    <Box align="start" direction="row" fill="vertical">
      <AppNavigation />
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/" component={Today} exact />
        <Route path="/roles" component={RoleList} exact />
        <Route path="/roles/:roleId" component={RoleDetail} exact />
        <Route path="/roles/:roleId/edit" component={RoleEdit} />
        <Route path="/tasks/add" component={TaskAdd} exact />
        <Route path="/tasks" component={TaskList} exact />
        <Route path="/tasks/:taskId" component={TaskDetail} exact />
        <Route path="/tasks/:taskId/edit" component={TaskEdit} exact />
        <Route path="/taskInstance/:taskInstanceId" component={TaskInstance} exact />
        {/* <Route path="/team" component={Team} exact /> */}
        <Route path="/users" component={UserList} exact />
        <Route path="/users/invite" component={UserAdd} exact />
        <Route path="/users/:userId" component={UserDetail} exact />
        <Route path="/users/:userId/edit" component={UserEdit} exact />
        <Route
          render={(props) => (
            <NotFound {...props} path="/" text="home" />
          )}
        />
      </Switch>
    </Box>
  )
};

export default AppLoggedIn;