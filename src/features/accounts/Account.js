import { Box } from 'grommet';
import { ContactInfo, CreditCard, SettingsOption } from 'grommet-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Page from '../../components/Page';
import Tabs from '../../components/Tabs';
import { selectLoggedInUser } from '../auth/authSlice';
import UserMenu from '../users/UserMenu';
import AccountContactInfo from './AccountContactInfo';
import AccountSettings from './AccountSettings';
import { selectUserAccount } from './accountsSlice';

const AccountDetail = () => {

  const pathname = window.location.pathname
  const account = useSelector(selectUserAccount)
  const user = useSelector(selectLoggedInUser);

  const individualTabs = [
      // {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
      {icon: <SettingsOption />, title: 'Account Settings', href: '/account/settings', active: (pathname === '/account/settings')},
  ]

  const teamTabs = [
      {icon: <ContactInfo />, title: 'Contact Info', href: '/account/contact', active: (pathname.startsWith('/account/contact'))},
      // {icon: <CreditCard />, title: 'Billing', href: '/account/billing', active: (pathname.startsWith('/account/billing'))},
      {icon: <SettingsOption />, title: 'Account Settings', href: '/account/settings', active: (pathname === '/account/settings')},
  ]

  const tabs = account.type === 'Free' ? individualTabs : teamTabs;

  return (
    <Page 
      title="Account" 
      pad="none"
      userMenu={<UserMenu mobile user={user} />}  
    >
        <Tabs tabs={tabs} />
        <Box style={{overflowY: "scroll"}}>
          <Switch>
            <Route exact path="/account" component={AccountSettings} />
            <Route exact path="/account/settings" component={AccountSettings} />
            {/* <Route path="/account/billing" component={AccountBilling} /> */}
            {/* <Route exact path="/account/billing/creditcard" component={AccountCreditCard} /> */}
            {/* <Route exact path="/account/billing/cancel" component={AccountCancel} /> */}
            <Route exact path="/account/contact" component={AccountContactInfo} />
          </Switch>
        </Box>
    </Page>
  )
};

export default AccountDetail;
