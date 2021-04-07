import { Box, Meter, Text } from 'grommet';
import { FormEdit, Visa, Mastercard, Amex, CreditCard } from 'grommet-icons';
import React, { useState } from 'react';
import EditDescription from '../../components/EditDescription';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import AccountCancel from './AccountCancel';
import AccountCreditCard from './AccountCreditCard';
import AccountBillingModify from './AccountBillingModify';
import { useSelector } from 'react-redux';
import { selectUserAccount } from './accountsSlice';
import { selectAllUsers } from '../users/usersSlice';


const AccountBillingTeam = () => {

  const account = useSelector(selectUserAccount);
  const users = useSelector(selectAllUsers);

  const usage = Math.round(users.length / account.subscription.quantity * 100)
  const usageColor = usage < 90 ? "status-ok" : "status-warning"

  let cardIcon
  if (account.cardbrand === 'visa') {
    cardIcon = <Visa />
  } else if (account.cardbrand === 'mastercard') {
    cardIcon = <Mastercard />
  } else if (account.cardbrand === 'amex') {
    cardIcon = <Amex />
  } else {
    cardIcon = <CreditCard />
  }


  const [CC, setCC] = useState(false)
  const [cancel, setCancel] = useState(false)
  const [modifySubscription, setModifySubscription] = useState(false)

  return (
    <Box gap="large" width="large" pad="medium">
      <Box gap="medium">
        <Text>Current Plan:</Text>
        <SubscriptionPlan
          title="Team"
          selected
          subtitle="Pro features for everyone"
          price={9}
          quantity={account.subscription.quantity}
          permonth
          peruser
        />
      </Box>
      <Box direction="row" align="center" justify="between" pad="medium">
        <Box align="center">
          <Meter
            size="small"
            background="background-contrast"
            round
            type="bar"
            values={[{"value": usage, "color": usageColor}]}
          />
          <Text weight="bold">{users.length} / {account.subscription.quantity} user seats used.</Text>
        </Box>
        <Box
            align="center"
            justify="between"
            pad="small"
            hoverIndicator
            round="small"
            direction="row"
            gap="medium"
            onClick={() => setModifySubscription(true)}
        >
            <FormEdit />
            <Text size="large">Add / Remove Seats</Text>
        </Box>
      </Box>


      <Box gap="large">
        <EditDescription
          size="large"
          title="Credit Card"
          description={`\u2022\u2022\u2022\u2022 ${account.cardlast4}`}
          cardIcon={cardIcon}
          onClick={() => setCC(true)}
        />
        <EditDescription
          size="large"
          title="Cancel"
          description="Cancel Subscription"
          onClick={() => setCancel(true)} />
      </Box>
      {(CC && <AccountCreditCard close={() => setCC(false)} />)}
      {(cancel && <AccountCancel close={() => setCancel(false)} />)}
      {(modifySubscription && <AccountBillingModify close={() => setModifySubscription(false) } />)}
    </Box>
  )
};

export default AccountBillingTeam;
