import { Box, Grid, ResponsiveContext } from 'grommet';
import { Checkmark, Compliance, Group, Organization, User } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileFooter from '../components/MobileFooter';
import NotFound from '../components/NotFound';
import Account from '../features/accounts/Account';
import { fetchAccount, selectUserAccount } from '../features/accounts/accountsSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { fetchLayers } from '../features/layers/layersSlice';
import Profile from '../features/profile/Profile';
import RoleDetail from '../features/roles/RoleDetail';
import RoleEdit from '../features/roles/RoleEdit';
import { fetchRoles } from '../features/roles/rolesSlice';
import RoutineAdd from '../features/routines/RoutineAdd';
import RoutineDetail from '../features/routines/RoutineDetail';
import RoutineEdit from '../features/routines/RoutineEdit';
import RoutineList from '../features/routines/RoutineList';
import Task from '../features/tasks/Task';
import TaskList from '../features/tasks/TaskList';
import { fetchTasks } from '../features/tasks/tasksSlice';
import Team from '../features/team/Team';
import { fetchUserRoles } from '../features/userRoles/userRolesSlice';
import UserAdd from '../features/users/UserAdd';
import UserDetail from '../features/users/UserDetail';
import UserEdit from '../features/users/UserEdit';


const AppLoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser);

  const pathname = window.location.pathname
  const account = useSelector(selectUserAccount);

  const individualLinks = [
    {label: 'Tasks', icon: <Checkmark />, href: '/', active: (pathname === '/' || pathname === '')},
    {label: 'Routines', icon: <Compliance />, href: '/routines', active: (pathname.startsWith('/routines'))},
    {label: 'Account', icon: <User />, href: '/account', active: (pathname.startsWith('/account'))},
  ]

  const teamLinks = [
    {label: 'Tasks', icon: <Checkmark />, href: '/', active: (pathname === '/')},
    {label: 'Routines', icon: <Compliance />, href: '/routines', active: (pathname.startsWith('/routines'))},
    {label: 'Team', icon: <Group />, href: '/team', active: (pathname.startsWith('/team'))},
  ]

  const adminLinks = [
      {label: 'Tasks', icon: <Checkmark />, href: '/', active: (pathname === '/')},
      {label: 'Routines', icon: <Compliance />, href: '/routines', active: (pathname.startsWith('/routines'))},
      {label: 'Team', icon: <Group />, href: '/team', active: (pathname.startsWith('/team'))},
      {label: 'Account', icon: <Organization />, href: '/account', active: (pathname.startsWith('/account'))},
  ]

  let links;
  if (account && account.type === 'Team') {
    if (user.is_account_admin) {
      links = adminLinks;
    } else {
      links = teamLinks;
    }
  } else {
    links = individualLinks;
  }
  const [status, setStatus] = useState('pending')


  useEffect(() => {
    const fetch = async () => {
      setStatus('pending')
      await dispatch(fetchAccount(user.account));
      await dispatch(fetchRoles());
      await dispatch(fetchUserRoles());
      await dispatch(fetchTasks());
      await dispatch(fetchLayers());
      setStatus('idle')
    }
    fetch()
  }, [dispatch, user.account]);

  let content
  if (status === 'idle') {
    content =(
      <Switch>
        <Route path="/" component={TaskList} exact />
        <Route path="/account" component={Account} />
        <Route path="/team" component={Team} />
        <Route path="/roles/:roleId" component={RoleDetail} exact />
        <Route path="/roles/:roleId/edit" component={RoleEdit} />
        <Route path="/routines/add" component={RoutineAdd} exact />
        <Route path="/routines" component={RoutineList} exact />
        <Route path="/routines/:routineId" component={RoutineDetail} exact />
        <Route path="/routines/:routineId/edit" component={RoutineEdit} exact />
        <Route path="/tasks/:taskId" component={Task} exact />
        <Route path="/users/invite" component={UserAdd} exact />
        <Route path="/users/:userId" component={UserDetail} exact />
        <Route path="/users/:userId/edit" component={UserEdit} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/login">
            <Redirect to="" />
        </Route>
        <Route
          render={(props) => (
            <NotFound {...props} path="/" text="home" />
          )}
        />
      </Switch>
    )
  }

  return (
    <ResponsiveContext.Consumer>
      {
        size => {
          switch (size) {
            case 'small':
              return (
                <Box>
                  {content}
                  <MobileFooter links={links} />
                </Box>

              )
            default:
              return (
                <Grid
                  fill
                  rows={['100%']}
                  columns={['auto', 'flex']}
                  areas={[
                    { name: 'sidebar', start: [0,0], end: [0,0] },
                    { name: 'main', start: [1, 0], end: [1,0] }
                  ]}
                >
                    <Box gridArea="sidebar">
                      <DesktopSidebar links={links} />
                    </Box>
                  <Box overflow="auto" gridArea='main'>
                    {content}
                  </Box>
                </Grid>

              )
          }
        }
      }
    </ResponsiveContext.Consumer>
  )
};

export default AppLoggedIn;