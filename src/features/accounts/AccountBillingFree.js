import { Box } from 'grommet';
import { Upgrade } from 'grommet-icons';
import React from 'react';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserAccount } from './accountsSlice';

const AccountBillingFree = () => {

  const account = useSelector(selectUserAccount);
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
        title="Upgrade to Team"
        subtitle="Pro features for everyone"
        icon={<Upgrade />}
        price={9}
        permonth
        peruser
        dataCY="upgrade-team"
        onClick={() => dispatch(push('/account/billing/upgradeTeam'))}
        trial={!account.has_ever_had_subscription}
      />
    </Box>
  )
};

export default AccountBillingFree;
