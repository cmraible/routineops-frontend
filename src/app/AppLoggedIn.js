import { Box, Grid, ResponsiveContext } from 'grommet';
import { ChatOption, Checkmark, Compliance, Group, Organization, User } from 'grommet-icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import DesktopSidebar from '../components/DesktopSidebar';
import MobileFooter from '../components/MobileFooter';
import NotFound from '../components/NotFound';
import Account from '../features/accounts/Account';
import { fetchAccount, selectUserAccount } from '../features/accounts/accountsSlice';
import { selectLoggedInUser } from '../features/auth/authSlice';
import RoutineAdd from '../features/routines/RoutineAdd';
import RoutineDetail from '../features/routines/RoutineDetail';
import RoutineEdit from '../features/routines/RoutineEdit';
import RoutineList from '../features/routines/RoutineList';
import Task from '../features/tasks/Task';
import TaskList from '../features/tasks/TaskList';
import Team from '../features/team/Team';
import RoleDetail from '../features/roles/RoleDetail';
import RoleEdit from '../features/roles/RoleEdit';
import UserDetail from '../features/users/UserDetail';
import UserEdit from '../features/users/UserEdit';


const AppLoggedIn = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

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
    {label: 'Account', icon: <Organization />, href: '/account', active: (pathname.startsWith('/account'))},
  ]

  const links = (account && account.type === 'Team') ? teamLinks : individualLinks;


  useEffect(() => {
    dispatch(fetchAccount(user.account))
  }, [dispatch, user.account]);

  const mainSwitch = (
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