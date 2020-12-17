import { Box } from 'grommet';
import { Upgrade } from 'grommet-icons';
import React, { useState } from 'react';
import EditDescription from '../../components/EditDescription';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import AccountCreditCard from './AccountCreditCard';
import AccountCancel from './AccountCancel';
const AccountBillingPro = () => {

  const [CC, setCC] = useState(false)
  const [cancel, setCancel] = useState(false)


  return (
    <>
    <Box gap="large" width="large" pad="medium">
      <Box gap="medium">
        <SubscriptionPlan
          title="Pro"
          selected
          subtitle="Extra features for power users"
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
      <Box gap="large">
        <EditDescription
          size="large"
          title="Credit Card"
          description="VISA xxxx 55555"
          onClick={() => setCC(true)}
        />
        <EditDescription
          size="large"
          title="Cancel"
          description="Cancel Subscription"
          onClick={() => setCancel(true)} />
      </Box>
    </Box>

    {(CC && <AccountCreditCard close={() => setCC(false)} />)}
    {(cancel && <AccountCancel close={() => setCancel(false)} />)}



      </>
  )
};

export default AccountBillingPro;
