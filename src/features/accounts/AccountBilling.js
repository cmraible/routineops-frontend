import React from 'react';
import { Box } from 'grommet';
import { Route, Switch } from 'react-router-dom';
import AccountBillingCurrent from './AccountBillingCurrent';
import AccountBillingUpgradeTeam from './AccountBillingUpgradeTeam';


const AccountBilling = () => {

  return (
    <Box>
      <Switch>
        <Route exact path="/account/billing" component={AccountBillingCurrent} />
        <Route exact path="/account/billing/upgradeTeam/:price" component={AccountBillingUpgradeTeam} />
      </Switch>
    </Box>

  )
};

export default AccountBilling;
