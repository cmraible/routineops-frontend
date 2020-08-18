import { Box, Button, CheckBox, Heading, Paragraph, Text } from 'grommet';
import { Subtract, Add, LinkNext } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { goToSignup } from '../actions/ui.actions';
import PricingOption from '../components/PricingOption';
import { getAllUsers } from '../reducers/reducers';
import { previewUpcomingInvoice, updateSubscription } from '../actions/subscription.actions';
import {DateTime} from 'luxon';

const OrgChangeSubscription = ({ isFetching, organization, users, previewUpcomingInvoice, updateSubscription, previewInvoice }) => {

  
  const stripe = useStripe();
  const elements = useElements();

  const plans = {
    "Basic": {
      "Monthly": {
        "price": 12,
        "price_id": "price_1HEgpKJaJXMgpjCHsuzaiRon"
      },
      "Yearly": {
        "price": 9,
        "price_id": "price_1HEgpKJaJXMgpjCHV7wI0XI3"
      }
    },
    "Starter": {
      "Monthly": {
        "price": 0,
        "price_id": "starter"
      },
      "Yearly": {
        "price": 0,
        "price_id": "starter"
      }
    }
  }

  const currentSubscription = (organization.subscription) ? "Basic" : "Basic" ;
  const currentUsers = users.length ;
  const currentQuantity = organization.subscription.quantity ;
  const currentBilling = (organization.subscription.billing_interval === "year") ? "Yearly" : "Monthly";

  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription);
  const [selectedSeats, setSelectedSeats] = useState(currentQuantity);
  const [selectedBilling, setSelectedBilling] = useState(currentBilling);

  const addSeat = () => setSelectedSeats(selectedSeats + 1);
  const removeSeat = () => (selectedSeats > currentUsers) ? setSelectedSeats(selectedSeats - 1) : setSelectedSeats(currentUsers);

  const handleSubmit = async ({value}) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const subscriptionData = {
      organization: organization.id,
      newPriceId: plans[selectedSubscription][selectedBilling].price_id,
      quantity: selectedSeats
    }
    console.log(subscriptionData);
    updateSubscription(subscriptionData);
  }

  useEffect(() => {
    previewUpcomingInvoice({
      organization: organization.id,
      quantity: selectedSeats,
      newPriceId: plans[selectedSubscription][selectedBilling].price_id
    })
  }, [selectedSeats, selectedSubscription, selectedBilling, organization.id, plans, previewUpcomingInvoice]);

  const changes = (currentSubscription !== selectedSubscription || currentQuantity !== selectedSeats || currentBilling !== selectedBilling)

  const nextPaymentAttempt = (previewInvoice) ? DateTime.fromSeconds(previewInvoice.invoice.next_payment_attempt) : undefined;
  const seats_delta = selectedSeats - currentQuantity;

  return (
    <Box flex={false} gap="small">
      <Heading margin="none" level={2}>Change Subscription</Heading>
      <Heading margin="none" level={4}>1. Select your subscription and billing preferences:</Heading>
      
      <Box direction="row" justify="around" pad="medium">
        <PricingOption label="Basic" price={plans["Basic"][selectedBilling].price} selected={selectedSubscription === "Basic"} onClick={() => setSelectedSubscription("Basic")} />
      </Box>
      <Box direction="row" gap="small" align="center" justify="center">
        <Text>Monthly</Text>
        <CheckBox 
          toggle 
          checked={selectedBilling === "Yearly"}
          onChange={() => (selectedBilling === "Yearly") ? setSelectedBilling("Monthly") : setSelectedBilling("Yearly")} 
        />
        <Text>Yearly</Text>
      </Box>
      <Box gap="small">
        <Heading margin="none" level={4}>2. Select how many users you need:</Heading>
        <Paragraph margin="none" color="text-xweak" size="small">You currently have {currentUsers} {(currentUsers > 1) ? 'users' : 'user'} in your organization.</Paragraph>
        <Box direction="row" align="center" justify="center" gap="medium">
          <Button icon={<Subtract />} primary onClick={removeSeat} />
          <Heading margin="none">{selectedSeats}</Heading>
          <Button icon={<Add />} primary onClick={addSeat} />
        </Box>
        {changes && (
          <Box direction="column" gap="small" pad="medium">
            <Box direction="row" align="center" gap="medium">
              <LinkNext />
              <Text>Changes:</Text>
            </Box>
            <Text>You are {(seats_delta >= 0) ? "adding" : "removing"} {Math.abs(seats_delta)} users. </Text>
            <Text>{selectedSeats} x {selectedSubscription} billed {selectedBilling} = ${(previewInvoice.next_invoice_sum/100).toFixed(2)} {selectedBilling}</Text>
              
            {previewInvoice.immediate_total >= 0 && (
              <Box direction="row" align="center" gap="medium">
                <LinkNext />
                <Text>You will be charged ${Math.abs(previewInvoice.immediate_total/100).toFixed(2)} today. </Text>
              </Box>
            )}
            {previewInvoice.immediate_total < 0 && (
              <Box>
                <Box direction="row" align="center" gap="medium">
                  <LinkNext />
                  <Text>You will be credited ${Math.abs(previewInvoice.immediate_total/100).toFixed(2)} today. This balance will be applied to your future payments.</Text>
                </Box>
                <Box direction="row" align="center" gap="medium">
                  <LinkNext />
                  <Text>If you would prefer to have this balance refunded instead, please contact us through the chat.</Text>
                </Box>
              </Box>
            )}
              
            <Box direction="row" align="center" gap="medium">
              <LinkNext />
              <Text>Your next payment of ${(previewInvoice.next_invoice_sum/100).toFixed(2)} will be due {(nextPaymentAttempt) ? nextPaymentAttempt.toFormat('MMMM dd, yyyy') : ''} </Text>
            </Box>
            <Button type="submit" label="Change Subscription" fill="horizontal" primary size="large" disabled={(isFetching || !stripe)} onClick={handleSubmit}/>
          </Box>
        )}
      </Box>
    </Box>
      
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  previewInvoice: state.organization.previewInvoice,
  isFetching: state.organization.isFetching,
  users: getAllUsers(state),
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { 
  goToSignup,
  updateSubscription,
  previewUpcomingInvoice
})(OrgChangeSubscription);
