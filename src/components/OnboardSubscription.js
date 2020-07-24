import { Box, Button, Form, Main, Heading, Text } from 'grommet';
import { Add, Close, LinkNext, Subtract } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { goToSignup } from '../actions/ui.actions';
import StripeCreditCardField from './StripeCreditCardField';
import Spinner from './Spinner';

const OnboardSubscription = ({ isFetching, darkMode }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [seats, setSeats] = useState(1)

  const addSeat = () => setSeats(seats + 1)
  const removeSeat = () => setSeats(Math.max(seats - 1, 1))

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
    }
  }

  return (
    <Main align="center" justify="start">
      <Box align="stretch" width="large" margin={{vertical: "large"}} flex={false}>
        <Heading>Routine Ops</Heading>
        <Spinner isFetching={isFetching} />
        <Heading level={3}>How many people will be using Routine Ops?</Heading>
        <Box  pad="medium" width="large">
          <Box gap="large" direction="row">
            <Box align="center" width="50%">
              <Box direction="row" align="center" justify="center" gap="medium">
                <Button primary icon={<Subtract />} onClick={removeSeat} />
                <Heading margin="none">{seats}</Heading>
                <Button primary icon={<Add />} onClick={addSeat} />
              </Box>
              <Text>user{(seats > 1) ? 's' : ''}</Text>
            </Box>
            <Box direction="column" align="center" gap="small" width="50%">
              <Heading margin="none">$29</Heading>
              <Text>/ user / month</Text>
            </Box>
          </Box>
        </Box>
      <Form
        onSubmit={handleSubmit}
      >
        <Box pad="small" width="large" gap="large">
          <Box pad="small" border="horizontal">
            <Text><LinkNext size="small" /> Free Trial: 14 days</Text>
            <Text><LinkNext size="small" /> Monthly Subscription: {seats} <Close size="small" /> $29.00 = ${29*seats}.00 / month</Text>
            <br/>
            <Text><LinkNext size="small" /> Total Due now: $0.00</Text>         
          </Box>
          <StripeCreditCardField darkMode={darkMode} />
          <Button type="submit" size="large" label="Start 14-Day Free Trial Now" primary disabled={!stripe} />
        </Box>
        
      </Form>
      </Box>
    </Main>
  )

};

const mapStateToProps = state => ({
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { goToSignup })(OnboardSubscription);
