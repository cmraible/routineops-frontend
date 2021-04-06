import { Box } from 'grommet';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page from '../../components/Page';
import AccountProfile from './AccountProfile';
import AccountUsers from './AccountUsers';
import AccountBilling from './AccountBilling';
import AccountSettings from './AccountSettings';
import AccountConnections from './AccountConnections';
import AccountCreditCard from './AccountCreditCard';
import AccountCancel from './AccountCancel';
import Tabs from '../../components/Tabs';

const AccountDetail = () => {

  return (
    <Page title="Account" pad="none">
        <Tabs />
        <Box>
          <Switch>
            <Route exact path="/account" component={AccountProfile} />
            <Route exact path="/account/profile" component={AccountProfile} />
            <Route exact path="/account/users" component={AccountUsers} />
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
