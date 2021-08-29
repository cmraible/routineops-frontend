import { Box } from 'grommet';
import { Connect, ContactInfo, SettingsOption } from 'grommet-icons';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Page from '../../components/Page';
import Tabs from '../../components/Tabs';
import UserMenu from '../users/UserMenu';
import ProfileConnections from './ProfileConnections';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileSettings from './ProfileSettings';
import { selectLoggedInUser } from '../auth/authSlice';

const Profile = () => {

  const pathname = window.location.pathname
  const user = useSelector(selectLoggedInUser);

  const tabs = [
      {icon: <ContactInfo />, title: 'Contact Info', href: '/profile', active: (pathname === '/profile')},
      {icon: <Connect />, title: 'Connections', href: '/profile/connections', active: (pathname === '/profile/connections')},
      {icon: <SettingsOption />, title: 'User Settings', href: '/profile/settings', active: (pathname === '/profile/settings')}
  ]

  return (
    <Page 
      title="Profile" 
      pad="none"
      userMenu={<UserMenu mobile user={user} />}

    >
        <Tabs tabs={tabs} />
        <Box style={{overflowY: "scroll"}}>
          <Switch>
            <Route exact path="/profile" component={ProfileContactInfo} />
            <Route path="/profile/connections" component={ProfileConnections} />
            <Route path="/profile/settings" component={ProfileSettings} />
          </Switch>
        </Box>
    </Page>
  )
};

export default Profile;
