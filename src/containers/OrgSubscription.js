import { Box, Button, Heading, Text } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { goToSignup } from '../actions/ui.actions';
import { getAllUsers } from '../reducers/reducers';
import { addSubscription, cancelSubscription } from '../actions/subscription.actions';
import CreateSubscription from './CreateSubscription';
import { DateTime } from 'luxon';

const OrgSubscription = ({ isFetching, darkMode, organization, users, cancelSubscription }) => {

  


  if (organization.subscription) {
    const subQuantity = organization.subscription.quantity;
    const lastAmount = organization.subscription.last_amount;
    const upcomingAmount = organization.subscription.upcoming_amount;
    const dueDate = DateTime.fromISO(organization.subscription.due);
    const billingInterval = organization.subscription.billing_interval;
    const billing = (billingInterval === "year") ? "yearly" : "monthly";
    return (
      <Box gap="small">
        <Heading margin="none" level={2}>Subscription</Heading>
        <Text>Current Plan: Basic for {subQuantity} users billed {billing}.</Text>
        <Text>Your last payment was ${lastAmount}.</Text>
        <Text>Your next payment of ${upcomingAmount} will be attempted on {dueDate.toFormat('MMMM dd, yyyy')}.</Text>
        <Text style={{"textTransform": "capitalize"}}>Credit Card: {organization.subscription.cardbrand} {'\u2022'}{'\u2022'}{'\u2022'}{'\u2022'} {organization.subscription.cardlast4}</Text>
        <Button color="status-ok" primary label="Change Subscription" />
        <Button color="status-critical" primary label="Cancel Subscription" onClick={() => cancelSubscription(organization.id)} disabled={isFetching} />
      </Box>
    )
  } else {
    return (<CreateSubscription />)
  }

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  users: getAllUsers(state),
  darkMode: state.ui.darkMode,
  isFetching: state.organization.isFetching
});

export default connect(mapStateToProps, { 
  goToSignup,
  addSubscription,
  cancelSubscription
})(OrgSubscription);
