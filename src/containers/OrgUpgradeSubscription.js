import { Box, Button, CheckBox, Form, Heading, Paragraph, Text } from 'grommet';
import { Subtract, Add, LinkNext } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { goToSignup } from '../actions/ui.actions';
import StripeCreditCardField from '../components/StripeCreditCardField';
import PricingOption from '../components/PricingOption';
import { getAllUsers } from '../reducers/reducers';
import { addSubscription } from '../actions/subscription.actions';

const OrgUpgradeSubscription = ({ isFetching, darkMode, organization, users, addSubscription }) => {

  
  const stripe = useStripe();
  const elements = useElements();

  const plans = {
    "Basic": {
      "Monthly": {
        "price": 19,
        "price_id": "price_1HEgpKJaJXMgpjCHsuzaiRon"
      },
      "Yearly": {
        "price": 14,
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

  const currentSubscription = (organization.subscription) ? organization.subscription : "Basic" ;
  const currentUsers = users.length ;

  const [selectedSubscription, setSelectedSubscription] = useState(currentSubscription);
  const [selectedSeats, setSelectedSeats] = useState(currentUsers);
  const [selectedBilling, setSelectedBilling] = useState("Yearly");

  const addSeat = () => setSelectedSeats(selectedSeats + 1);
  const removeSeat = () => (selectedSeats > currentUsers) ? setSelectedSeats(selectedSeats - 1) : setSelectedSeats(currentUsers);

  const price = (selectedBilling === "Yearly" ) ? 
    plans[selectedSubscription][selectedBilling].price * selectedSeats * 12 : 
    plans[selectedSubscription][selectedBilling].price * selectedSeats ;

  const savings = (selectedBilling === "Yearly") ?
    (plans[selectedSubscription]["Monthly"].price * 12 * selectedSeats) - price :
    0 ;

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
        organization: organization.id,
        paymentMethodId: paymentMethod.id,
        priceId: plans[selectedSubscription][selectedBilling].price_id,
        quantity: selectedSeats
      }
      console.log(subscriptionData)
      addSubscription(subscriptionData);
    }
  }

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
      
      
      { // only show the checkout form if the current price > 0.
        price > 0 && (
        <Box gap="small">
          <Heading margin="none" level={4}>2. Select how many users you need:</Heading>
          <Paragraph margin="none" color="text-xweak" size="small">You currently have {currentUsers} users in your organization.</Paragraph>
          <Box direction="row" align="center" justify="center" gap="medium">
            <Button icon={<Subtract />} primary primary onClick={removeSeat} />
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
              <Text>{selectedSeats} x {selectedSubscription} billed {selectedBilling} = ${price} {selectedBilling}</Text>
              <Box direction="row" align="center" gap="medium">
                <LinkNext />
                <Text>Due Now: ${price}</Text>
              </Box>
              <Button type="submit" label="Start Subscription" fill="horizontal" primary size="large" disabled={isFetching}/>
            </Box>
          </Form>
        </Box>
        )
      }
      
    </Box>
      
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  users: getAllUsers(state),
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { 
  goToSignup,
  addSubscription
})(OrgUpgradeSubscription);
