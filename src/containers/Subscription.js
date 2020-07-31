import { Box, Button, CheckBox, Form, Heading, Text } from 'grommet';
import { Add, Close, LinkNext, Subtract } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { goToSignup } from '../actions/ui.actions';
import StripeCreditCardField from '../components/StripeCreditCardField';
import Page from '../components/Page';
import PricingOption from '../components/PricingOption';

const Subscription = ({ isFetching, darkMode }) => {

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

  const [yearly, setYearly] = useState();

  const teamPrice = (yearly) ? 12 : 15 ;


  return (
    <Page title="Subscription">
      <Text>Routine Ops is built for teams. How many users would you like to start with?</Text>
      <Text color="text-xweak">Note: You can always add or remove users later.</Text>
      <Box pad="medium" width="large" gap="medium" flex={false}>
        <Box direction="row" fill="horizontal" gap="small" justify="center">
          <Text>Monthly</Text>
          <CheckBox toggle checked={yearly} onChange={(event) => setYearly(event.target.checked)} />
          <Text>Yearly</Text>
        </Box>
        <Box gap="medium">
          <Box direction="row-responsive" gap="small" justify="center">
            <PricingOption label="Individual" price={0} selected={(seats === 1)} />
            <PricingOption label="Team" price={teamPrice} selected={(seats > 1)} />
          </Box>
        </Box>
        <Box gap="medium">
          <Text>2. Select how many users:</Text>
          <Box align="center">
            <Box direction="row" align="center" justify="center" gap="medium">
              <Button primary icon={<Subtract />} onClick={removeSeat} />
                <Heading margin="none">{seats}</Heading>
              <Button primary icon={<Add />} onClick={addSeat} />
            </Box>
            <Text>user{(seats > 1) ? 's' : ''}</Text>
          </Box>
        </Box>
        <Form
          onSubmit={handleSubmit}
        >
          <Box pad="small" width="large" gap="large">
            <Box pad="small" border="horizontal">
              <Text><LinkNext size="small" /> {(yearly) ? "Yearly" : "Monthly"} Subscription: {seats} <Close size="small" /> ${(yearly) ? teamPrice * 12 : teamPrice} = ${(yearly) ? teamPrice * seats * 12 : teamPrice * seats } / {(yearly) ? "year" : "month"}</Text>
              <br/>
              <Text><LinkNext size="small" /> Total Due now: $0.00</Text>         
            </Box>
            <StripeCreditCardField darkMode={darkMode} />
            <Button type="submit" size="large" label="Start 14-Day Free Trial Now" primary disabled={!stripe} />
          </Box>
        </Form>
      </Box>
    </Page>
  )

};

const mapStateToProps = state => ({
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { goToSignup })(Subscription);
