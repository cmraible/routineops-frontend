import { Box, Button,  Heading, Meter, Paragraph, Text } from 'grommet';
import { Edit, CreditCard, Close } from 'grommet-icons'
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { goToOrgChangeSubscription, goToOrgChangePaymentMethod } from '../actions/ui.actions';
import { getAllUsers } from '../reducers/reducers';
import { cancelSubscription, getUpcomingInvoice } from '../actions/subscription.actions';
import { DateTime } from 'luxon';


const OrgSubscriptionDetail = ({ isFetching, organization, users, cancelSubscription, goToOrgChangeSubscription, goToOrgChangePaymentMethod, getUpcomingInvoice, upcomingInvoice }) => {

  const subQuantity = organization.subscription.quantity;
  const productName = organization.subscription.product_name;
  const priceId = organization.subscription.price_id;
  const lastAmount = organization.subscription.last_amount;
  const lastPaid = DateTime.fromISO(organization.subscription.last_paid);
  const upcomingAmount = (upcomingInvoice) ? upcomingInvoice.next_invoice_sum/100 : undefined;
  const dueDate = (upcomingInvoice) ? DateTime.fromSeconds(upcomingInvoice.invoice.next_payment_attempt) : undefined;
  const billingInterval = organization.subscription.billing_interval;
  const billing = (billingInterval === "year") ? "Yearly" : "Monthly";
  const cardbrand = organization.cardbrand;
  const cardlast4 = organization.cardlast4;
  const meterColor = (users.length / subQuantity > 0.9) ? "status-critical" : "status-ok";

  useEffect(() => {
    getUpcomingInvoice({
      organization: organization.id,
      quantity: subQuantity,
      newPriceId: priceId
    })
  }, [organization, subQuantity, priceId, getUpcomingInvoice]);
  


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
        <Button label="Change Subscription" disabled={isFetching} icon={<Edit />} primary onClick={goToOrgChangeSubscription} />
      </Box>
      <Box direction="row" align="center" justify="between">
        <Paragraph color="text-xweak">Update the default payment method on file.</Paragraph>
        <Button label="Change Credit Card" disabled={isFetching} icon={<CreditCard />} primary onClick={goToOrgChangePaymentMethod} />
      </Box>
      <Box direction="row" align="center" justify="between">
        <Paragraph color="text-xweak">Cancel your subscription.</Paragraph>
        <Button color="status-critical" disabled={isFetching} label="Cancel Subscription" icon={<Close />} primary onClick={() => cancelSubscription(organization.id)} />
      </Box>
    </Box>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  upcomingInvoice: state.organization.upcomingInvoice,
  isFetching: state.organization.isFetching,
  users: getAllUsers(state)
});

export default connect(mapStateToProps, { 
  goToOrgChangeSubscription,
  goToOrgChangePaymentMethod,
  getUpcomingInvoice,
  cancelSubscription
})(OrgSubscriptionDetail);
