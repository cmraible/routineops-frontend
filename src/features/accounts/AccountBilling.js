import React from 'react';
import { Box } from 'grommet';
import { Route, Switch } from 'react-router-dom';
import AccountBillingCurrent from './AccountBillingCurrent';
import AccountBillingUpgradePro from './AccountBillingUpgradePro';
import AccountBillingUpgradeTeam from './AccountBillingUpgradeTeam';


const AccountBilling = () => {

  return (
    <Box>
      <Switch>
        <Route exact path="/account/billing" component={AccountBillingCurrent} />
        <Route exact path="/account/billing/upgradePro" component={AccountBillingUpgradePro} />
        <Route exact path="/account/billing/upgradeTeam" component={AccountBillingUpgradeTeam} />
      </Switch>
    </Box>

  )
};

export default AccountBilling;
