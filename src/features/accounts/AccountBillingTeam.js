import { unwrapResult } from '@reduxjs/toolkit';
import { Box, Meter, Text } from 'grommet';
import { Amex, CreditCard, FormEdit, Mastercard, Visa } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditDescription from '../../components/EditDescription';
import SubscriptionPlan from '../../components/SubscriptionPlan';
import { getPrice } from '../subscriptions/subscriptionsSlice';
import { selectAllUsers } from '../users/usersSlice';
import AccountBillingModify from './AccountBillingModify';
import AccountCancel from './AccountCancel';
import AccountCreditCard from './AccountCreditCard';
import { selectUserAccount } from './accountsSlice';


const AccountBillingTeam = () => {

  const dispatch = useDispatch();
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
  const [priceDetails, setPriceDetails] = useState(null);

  useEffect(() => {
      const fetchPrice = async () => {
          const actionResult = await dispatch(getPrice(account.subscription.price_id));
          unwrapResult(actionResult)
          setPriceDetails(actionResult.payload)
      }
      fetchPrice()
  }, [dispatch, account.subscription.price_id]);

  return (
    <Box gap="large" width="large" pad="medium">
      <Box gap="medium">
        <Text>Current Plan:</Text>
        {priceDetails && (
          <SubscriptionPlan
            title="Team"
            selected
            subtitle="Pro features for everyone"
            price={priceDetails.unit_amount/100}
            quantity={account.subscription.quantity}
            permonth={priceDetails.recurring.interval === 'month'}
            peryear={priceDetails.recurring.interval === 'year'}
            peruser
          />
        )}

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
