import { Box } from 'grommet';
import { User, UserNew } from 'grommet-icons';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../../components/Page';
import Tabs from '../../components/Tabs';
import RoleList from '../roles/RoleList';
import UserAdd from '../users/UserAdd';
import UserList from '../users/UserList';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import UserMenu from '../users/UserMenu';


const Team = () => {

    const pathname = window.location.pathname
    const user = useSelector(selectLoggedInUser);


    const tabs = [
        {icon: <User />, title: 'Users', href: '/team', active: (pathname === '/team' || pathname.startsWith('/team/users'))},
        {icon: <UserNew />, title: 'Roles', href: '/team/roles', active: (pathname.startsWith('/team/roles'))}
    ]

    return (
        <Page 
            title="Team" 
            pad="none"
            userMenu={<UserMenu mobile user={user} />}  
        >
            <Tabs tabs={tabs} />
            <Box fill>
                <Switch>
                    <Route path="/team" component={UserList} exact />
                    <Route path="/team/roles" component={RoleList} exact />
                    <Route path="/team/users" component={UserList} exact />
                    <Route path="/team/users/invite" component={UserAdd} exact />
                </Switch>
            </Box>
        </Page>
    )
}

export default Team;