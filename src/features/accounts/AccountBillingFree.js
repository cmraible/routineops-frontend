import { Box } from 'grommet';
import { Upgrade } from 'grommet-icons';
import React from 'react';
import SubscriptionPlan from '../../components/SubscriptionPlan';

const AccountBillingFree = () => {
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
        />
        <SubscriptionPlan
          title="Upgrade to Team"
          subtitle="Pro features for everyone"
          icon={<Upgrade />}
          price={9}
          permonth
          peruser
        />
      </Box>
  )
};

export default AccountBillingFree;
