import { Box, Button,  Heading, Meter, Paragraph, Text } from 'grommet';
import { Edit, CreditCard, Close } from 'grommet-icons'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { selectAllUsers } from '../features/users/usersSlice';
import { previewUpcomingInvoice, cancelSubscription } from '../features/subscriptions/subscriptionsSlice';
import { push } from 'connected-react-router';

const AccountSubscriptionDetail = () => {
  const dispatch = useDispatch()
  const [upcomingInvoice] = useState(undefined)
  const [requestStatus] = useState('idle')
  const account = useSelector(selectUserAccount)
  const users = useSelector(selectAllUsers)
  const subQuantity = account.subscription.quantity;
  const productName = account.subscription.product_name;
  const priceId = account.subscription.price_id;
  const lastAmount = account.subscription.last_amount;
  const lastPaid = DateTime.fromISO(account.subscription.last_paid);
  const upcomingAmount = (upcomingInvoice) ? upcomingInvoice.next_invoice_sum/100 : undefined;
  const dueDate = (upcomingInvoice) ? DateTime.fromSeconds(upcomingInvoice.invoice.next_payment_attempt) : undefined;
  const billingInterval = account.subscription.billing_interval;
  const billing = (billingInterval === "year") ? "Yearly" : "Monthly";
  const cardbrand = account.cardbrand;
  const cardlast4 = account.cardlast4;
  const meterColor = (users.length / subQuantity > 0.9) ? "status-critical" : "status-ok";

  useEffect(() => {
    dispatch(previewUpcomingInvoice({
      account: account.id,
      quantity: subQuantity,
      newPriceId: priceId
    }));
  }, [dispatch, account, subQuantity, priceId]);


  return (
    <Box flex={false} gap="medium">
      <Heading margin="none" level={2}>Subscription</Heading>
      <Box direction="row" align="center" justify="between">
        <Text>Current Plan:</Text>
        <Text weight="bold">{productName}</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Billing Interval:</Text>
        <Text weight="bold">{billing}</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>User Limit:</Text>
        <Box direction="row" align="center" gap="small">
          <Text weight="bold">{users.length} / {subQuantity}</Text>
          <Meter type="bar" max={subQuantity} round={true} size="small" values={[{"value": users.length, "color": meterColor}]}  />
        </Box>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Credit Card:</Text>
        <Text weight="bold" style={{"textTransform": "capitalize"}}>{cardbrand} {'\u2022\u2022\u2022\u2022'} {cardlast4}</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Last Payment:</Text>
        <Text weight="bold">${lastAmount} on {lastPaid.toFormat('MMMM dd, yyyy')}</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Next Payment Attempt:</Text>
        <Text weight="bold">${(upcomingAmount) ? upcomingAmount : ''} on {(dueDate) ? dueDate.toFormat('MMMM dd, yyyy') : ''}</Text>
      </Box>
      <Heading margin="none" level={2}>Actions</Heading>
      <Box direction="row" align="center" justify="between">
        <Paragraph color="text-xweak">Change plans, add or remove users, or modify your billing interval.</Paragraph>
        <Button label="Change Subscription" disabled={requestStatus === 'pending'} icon={<Edit />} primary onClick={() => dispatch(push('/account/subscription/change'))} />
      </Box>
      <Box direction="row" align="center" justify="between">
        <Paragraph color="text-xweak">Update the default payment method on file.</Paragraph>
        <Button label="Change Credit Card" disabled={requestStatus === 'pending'} icon={<CreditCard />} primary onClick={dispatch(push('account/subscription/payment'))} />
      </Box>
      <Box direction="row" align="center" justify="between">
        <Paragraph color="text-xweak">Cancel your subscription.</Paragraph>
        <Button color="status-critical" disabled={requestStatus === 'pending'} label="Cancel Subscription" icon={<Close />} primary onClick={() => cancelSubscription(account.id)} />
      </Box>
    </Box>
  )

};

export default AccountSubscriptionDetail;
