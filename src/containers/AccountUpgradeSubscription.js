import { Box, Button, CheckBox, Form, Heading, Paragraph, Text } from 'grommet';
import { Subtract, Add, LinkNext } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import StripeCreditCardField from '../components/StripeCreditCardField';
import PricingOption from '../components/PricingOption';
import { addNewSubscription, previewUpcomingInvoice } from '../features/subscriptions/subscriptionsSlice';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { selectAllUsers } from '../features/users/usersSlice';

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

const AccountUpgradeSubscription = () => {
  const dispatch = useDispatch()
  const account = useSelector(selectUserAccount)
  const users = useSelector(selectAllUsers)
  const darkMode = useSelector(state => state.ui.darkMode)


  const stripe = useStripe();
  const elements = useElements();



  const currentSubscription = (account.subscription) ? account.subscription : "Basic" ;
  const currentUsers = users.length ;

  const [previewInvoice] = useState(undefined);
  const [requestStatus] = useState('idle');

  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription);
  const [selectedSeats, setSelectedSeats] = useState(currentUsers);
  const [selectedBilling, setSelectedBilling] = useState("Yearly");

  const addSeat = () => setSelectedSeats(selectedSeats + 1);
  const removeSeat = () => (selectedSeats > currentUsers) ? setSelectedSeats(selectedSeats - 1) : setSelectedSeats(currentUsers);

  const handleSubmit = async ({value}) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      const subscriptionData = {
        account: account.id,
        paymentMethodId: paymentMethod.id,
        priceId: plans[selectedSubscription][selectedBilling].price_id,
        quantity: selectedSeats
      }
      console.log(subscriptionData)
      dispatch(addNewSubscription(subscriptionData));
    }
  }

  useEffect(() => {
    previewUpcomingInvoice({
      account: account.id,
      quantity: selectedSeats,
      newPriceId: plans[selectedSubscription][selectedBilling].price_id
    })
  }, [selectedSeats, selectedSubscription, selectedBilling, account.id]);

  return (
    <Box flex={false} gap="small">
      <Heading margin="none" level={2}>Upgrade Subscription</Heading>
      <Heading margin="none" level={4}>1. Select your subscription and billing preferences:</Heading>

      <Box direction="row" justify="around" pad="medium">
        <PricingOption label="Starter" price={0} selected={selectedSubscription === "Starter"} onClick={() => setSelectedSubscription("Starter")} />
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
          <Paragraph margin="none" color="text-xweak" size="small">You currently have {currentUsers} users on your account.</Paragraph>
          <Box direction="row" align="center" justify="center" gap="medium">
            <Button icon={<Subtract />} primary onClick={removeSeat} />
            <Heading margin="none">{selectedSeats}</Heading>
            <Button icon={<Add />} primary onClick={addSeat} />
          </Box>
          <Heading margin="none" level={4}>3. Enter your Credit Card information:</Heading>
          <Form
            onSubmit={handleSubmit}
          >
            <StripeCreditCardField darkMode={darkMode} />
            <Heading margin="none" level={4}>4. Confirm and submit:</Heading>
            <Box direction="column" gap="small" pad="medium">
              <Box direction="row" align="center" gap="medium">
                <LinkNext />
                <Text>Subscription:</Text>
              </Box>
              <Text>{selectedSeats} x {selectedSubscription} billed {selectedBilling} = ${(previewInvoice) ? previewInvoice.invoice.total/100 : 0} {selectedBilling}</Text>
              <Box direction="row" align="center" gap="medium">
                <LinkNext />
                <Text>Due Now: ${(previewInvoice) ? previewInvoice.invoice.total/100 : 0}</Text>
              </Box>
              <Button type="submit" label="Start Subscription" fill="horizontal" primary size="large" disabled={requestStatus === 'pending'}/>
            </Box>
          </Form>
        </Box>
    </Box>
  )

};

export default AccountUpgradeSubscription;
