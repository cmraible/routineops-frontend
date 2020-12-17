import React from 'react';
import { useSelector } from 'react-redux';
import AccountUpgradeSubscription from './AccountUpgradeSubscription';
import AccountChangeSubscription from './AccountChangeSubscription';
import AccountStarterSubscription from './AccountStarterSubscription';
import AccountSubscriptionDetail from './AccountSubscriptionDetail';
import AccountChangePaymentMethod from './AccountChangePaymentMethod';
import { selectUserAccount } from '../features/accounts/accountsSlice'

import { Switch, Route } from 'react-router-dom';

const AccountSubscription = () => {
  const account = useSelector(selectUserAccount);


  if (account.subscription) {
    return (
      <Switch>
        <Route exact path="/account/subscription" component={AccountSubscriptionDetail} />
        <Route exact path="/account/subscription/change" component={AccountChangeSubscription} />
        <Route exact path="/account/subscription/payment" component={AccountChangePaymentMethod} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/account/subscription" component={AccountStarterSubscription} />
        <Route exact path="/account/subscription/change" component={AccountStarterSubscription} />
        <Route exact path="/account/subscription/upgrade" component={AccountUpgradeSubscription} />
      </Switch>
    )
  }
};

export default AccountSubscription;
