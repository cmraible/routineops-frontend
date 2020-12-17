import { Box, Button, Form, Heading, Text } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import StripeCreditCardField from '../components/StripeCreditCardField';
import { selectUserAccount } from '../features/accounts/accountsSlice';


const AccountChangePaymentMethod = () => {

  const account = useSelector(selectUserAccount)

  const [setupIntent] = useState(undefined);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //getAccountSetupIntent(account.id);
  }, [account.id, account.stripe_payment_method_id]);


  const handleSubmit = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardSetup(setupIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Display result.error.message in your UI.
      console.log(result.error)
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      console.log(result);
      //updateOrgPaymentMethod(account.id, result.setupIntent.payment_method);
    }
  }

  const cardbrand = account.cardbrand;
  const cardlast4 = account.cardlast4;

  return (
    <Box flex={false} gap="small">
      <Heading margin="none" level={2}>Change Payment Method</Heading>
      <Box direction="row" align="center" justify="between">
        <Text>Current Credit Card:</Text>
        <Text weight="bold" style={{"textTransform": "capitalize"}}>{cardbrand} {'\u2022\u2022\u2022\u2022'} {cardlast4}</Text>
      </Box>
      <Form
        onSubmit={handleSubmit}
      >
        <StripeCreditCardField label="New Credit Card" />
        <Button disabled={!stripe} label="Update" primary type="submit" />
      </Form>

    </Box>

  )

};

export default AccountChangePaymentMethod;
