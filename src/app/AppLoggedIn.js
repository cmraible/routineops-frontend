import { Box, Grid, ResponsiveContext } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from '../components/NotFound';
import Account from '../features/accounts/Account';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileFooter from '../components/MobileFooter';
import RoleDetail from '../features/roles/RoleDetail';
import RoleEdit from '../features/roles/RoleEdit';
import RoleList from '../features/roles/RoleList';
import TaskInstance from '../features/taskInstances/TaskInstance';
import Todo from '../features/taskInstances/Todo';
import RoutineAdd from '../features/routines/RoutineAdd';
import RoutineDetail from '../features/routines/RoutineDetail';
import RoutineEdit from '../features/routines/RoutineEdit';
import RoutineList from '../features/routines/RoutineList';
import UserAdd from '../features/users/UserAdd';
import UserDetail from '../features/users/UserDetail';
import UserEdit from '../features/users/UserEdit';
import UserList from '../features/users/UserList';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { ChatOption, Checkmark, Group, Notes, User, Organization } from 'grommet-icons';

import { fetchAccount } from '../features/accounts/accountsSlice';

const AppLoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  const pathname = window.location.pathname
  const account = useSelector(selectUserAccount);

  const individualLinks = [
    {label: 'Routines', icon: <Notes />, href: '/routines', active: (pathname.startsWith('/routines'))},
    {label: 'To do', icon: <Checkmark />, href: '/', active: (pathname === '/' || pathname === '')},
    {label: 'Account', icon: <User />, href: '/account', active: (pathname.startsWith('/account'))},
  ]

  const teamLinks = [
    {label: 'Routines', icon: <Notes />, href: '/routines', active: (pathname.startsWith('/routines'))},
    {label: 'To do', icon: <Checkmark />, href: '/', active: (pathname === '/')},
    {label: 'Team', icon: <Group />, href: '/roles', active: (pathname.startsWith('/roles'))},
    {label: 'Account', icon: <Organization />, href: '/account', active: (pathname.startsWith('/team'))},
  ]

  const links = (account && account.type === 'Team') ? teamLinks : individualLinks;


  useEffect(() => {
    dispatch(fetchAccount(user.account))
  }, [dispatch, user.account]);

  const mainSwitch = (
      <Switch>
        <Route path="/account" component={Account} />
        <Route path="/" component={Todo} exact />
        <Route path="/roles" component={RoleList} exact />
        <Route path="/roles/:roleId" component={RoleDetail} exact />
        <Route path="/roles/:roleId/edit" component={RoleEdit} />
        <Route path="/routines/add" component={RoutineAdd} exact />
        <Route path="/routines" component={RoutineList} exact />
        <Route path="/routines/:routineId" component={RoutineDetail} exact />
        <Route path="/routines/:routineId/edit" component={RoutineEdit} exact />
        <Route path="/taskInstance/:taskInstanceId" component={TaskInstance} exact />
        <Route path="/users" component={UserList} exact />
        <Route path="/users/invite" component={UserAdd} exact />
        <Route path="/users/:userId" component={UserDetail} exact />
        <Route path="/users/:userId/edit" component={UserEdit} exact />
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

  return (
    <ResponsiveContext.Consumer>
      {
        size => {
          switch (size) {
            case 'small':
              return (
                <Box>
                  {mainSwitch}

                  <MobileFooter links={[...links, {label: "Help", icon: <ChatOption />, id: "help-chat", active: false}]} />
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
                    {mainSwitch}
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