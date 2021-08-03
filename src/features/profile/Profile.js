import { Box } from 'grommet';
import { Connect, ContactInfo, SettingsOption } from 'grommet-icons';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../../components/Page';
import Tabs from '../../components/Tabs';
import ProfileConnections from './ProfileConnections';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileSettings from './ProfileSettings';

const Profile = () => {

  const pathname = window.location.pathname

  const tabs = [
      {icon: <ContactInfo />, title: 'Contact Info', href: '/profile', active: (pathname === '/profile')},
      {icon: <Connect />, title: 'Connections', href: '/profile/connections', active: (pathname === '/profile/connections')},
      {icon: <SettingsOption />, title: 'User Settings', href: '/profile/settings', active: (pathname === '/profile/settings')}
  ]

  return (
    <Page title="Profile" pad="none">
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