import { Box } from 'grommet';
import { Connect, ContactInfo, CreditCard, SettingsOption } from 'grommet-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Page from '../../components/Page';
import Tabs from '../../components/Tabs';
import AccountBilling from './AccountBilling';
import AccountCancel from './AccountCancel';
import AccountConnections from './AccountConnections';
import AccountCreditCard from './AccountCreditCard';
import AccountProfile from './AccountProfile';
import AccountSettings from './AccountSettings';
import { selectUserAccount } from './accountsSlice';

const AccountDetail = () => {

  const pathname = window.location.pathname
  const account = useSelector(selectUserAccount)

  const individualTabs = [
      {icon: <ContactInfo />, title: 'My Profile', href: '/account/profile', active: (pathname === '/account/profile' || pathname === '/account')},
      {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
      {icon: <Connect />, title: 'Connections', href: '/account/connections', active: (pathname === '/account/connections')},
      {icon: <SettingsOption />, title: 'Settings', href: '/account/settings', active: (pathname === '/account/settings')},
  ]

  const teamTabs = [
      {icon: <ContactInfo />, title: 'My Profile', href: '/account/profile', active: (pathname === '/account/profile' || pathname === '/account')},
      {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
      {icon: <Connect />, title: 'Connections', href: '/account/connections', active: (pathname === '/account/connections')},
      {icon: <SettingsOption />, title: 'Settings', href: '/account/settings', active: (pathname === '/account/settings')},
  ]

  const tabs = account.type === 'Free' ? individualTabs : teamTabs;

  return (
    <Page title="Account" pad="none">
        <Tabs tabs={tabs} />
        <Box style={{overflowY: "scroll"}}>
          <Switch>
            <Route exact path="/account" component={AccountProfile} />
            <Route exact path="/account/profile" component={AccountProfile} />
            <Route exact path="/account/connections" component={AccountConnections} />
            <Route exact path="/account/settings" component={AccountSettings} />
            <Route path="/account/billing" component={AccountBilling} />
            <Route exact path="/account/billing/creditcard" component={AccountCreditCard} />
            <Route exact path="/account/billing/cancel" component={AccountCancel} />
          </Switch>
        </Box>
    </Page>
  )
};

export default AccountDetail;
