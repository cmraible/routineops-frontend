import { Box } from 'grommet';
import { Upgrade } from 'grommet-icons';
import React from 'react';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const AccountBillingFree = () => {


  const dispatch = useDispatch();

  return (
    <Box pad="medium" gap="medium" width="large">
      <SubscriptionPlan
        title="Free"
        subtitle="Track personal tasks and habits"
        price={0}
        selected
      />
      <SubscriptionPlan
        title="Upgrade to Pro"
        subtitle="Extra features for power users"
        icon={<Upgrade />}
        price={5}
        permonth
        dataCY="upgrade-pro"
        onClick={() => dispatch(push('/account/billing/upgradePro'))}
      />
      <SubscriptionPlan
        title="Upgrade to Team"
        subtitle="Pro features for everyone"
        icon={<Upgrade />}
        price={9}
        permonth
        peruser
        dataCY="upgrade-team"
        onClick={() => dispatch(push('/account/billing/upgradeTeam'))}
      />
    </Box>
  )
};

export default AccountBillingFree;
