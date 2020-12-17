import { Box, Button, CheckBox, Heading, Paragraph, Text } from 'grommet';
import { Subtract, Add, LinkNext } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import PricingOption from '../components/PricingOption';
import {DateTime} from 'luxon';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { updateSubscription, previewUpcomingInvoice } from '../features/subscriptions/subscriptionsSlice'
import { selectAllUsers } from '../features/users/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit'

const plans = {
  "Basic": {
    "Monthly": {
      "price": process.env.REACT_APP_BASIC_MONTHLY_PRICE,
      "price_id": process.env.REACT_APP_BASIC_MONTHLY_PRICE_ID
    },
    "Yearly": {
      "price": process.env.REACT_APP_BASIC_YEARLY_PRICE,
      "price_id": process.env.REACT_APP_BASIC_YEARLY_PRICE_ID
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

const AccountChangeSubscription = () => {
  const dispatch = useDispatch()


  const stripe = useStripe();
  const elements = useElements();
  const account = useSelector(selectUserAccount)
  const users = useSelector(selectAllUsers)

  const currentSubscription = (account.subscription) ? "Basic" : "Basic" ;
  const currentUsers = users.length ;
  const currentQuantity = account.subscription.quantity ;
  const currentBilling = (account.subscription.billing_interval === "year") ? "Yearly" : "Monthly";

  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription);
  const [selectedSeats, setSelectedSeats] = useState(currentQuantity);
  const [selectedBilling, setSelectedBilling] = useState(currentBilling);
  const [previewInvoice, setPreviewInvoice] = useState();
  const [invoiceRequestStatus, setInvoiceRequestStatus] = useState('idle');
  const [updateRequestStatus, setUpdateRequestStatus] = useState('idle');

  const addSeat = () => setSelectedSeats(selectedSeats + 1);
  const removeSeat = () => (selectedSeats > currentUsers) ? setSelectedSeats(selectedSeats - 1) : setSelectedSeats(currentUsers);

  const handleSubmit = async ({value}) => {
    setUpdateRequestStatus('pending')
    try {
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      const subscriptionData = {
        account: account.id,
        newPriceId: plans[selectedSubscription][selectedBilling].price_id,
        quantity: selectedSeats
      }
      console.log(subscriptionData);
      dispatch(updateSubscription(subscriptionData));
      setUpdateRequestStatus('succeeded')
    } catch (err) {
      console.log(err)
      setUpdateRequestStatus('failed')
    }

  }

  useEffect(() => {
    const fetchInvoice = async () => {
      setInvoiceRequestStatus('pending')
      const actionResult = await dispatch(previewUpcomingInvoice({
        account: account.id,
        quantity: selectedSeats,
        newPriceId: plans[selectedSubscription][selectedBilling].price_id
      }))
      unwrapResult(actionResult);
      setPreviewInvoice(actionResult.payload);
      setInvoiceRequestStatus('idle')
    }
    try {
      fetchInvoice()
    } catch (err) {
      console.log(err)
    }
  }, [dispatch, selectedSeats, selectedSubscription, selectedBilling, account.id]);

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
        <Paragraph margin="none" color="text-xweak" size="small">You currently have {currentUsers} {(currentUsers > 1) ? 'users' : 'user'} on your account.</Paragraph>
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
            <Button
              type="submit"
              label="Change Subscription"
              fill="horizontal"
              primary
              size="large"
              disabled={(updateRequestStatus === 'pending' || invoiceRequestStatus === 'pending' || !stripe)}
              onClick={handleSubmit}
            />
          </Box>
        )}
      </Box>
    </Box>

  )

};

export default AccountChangeSubscription;
