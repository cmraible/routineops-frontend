import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Box, Form } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import StripeCreditCardField from '../../components/StripeCreditCardField';
import SubmitButton from '../../components/SubmitButton';
import { fetchAccountSetupIntent, selectUserAccount, updateAccountPaymentMethod } from './accountsSlice';

const AccountCreditCard = ({close}) => {

  const dispatch = useDispatch();
  const account = useSelector(selectUserAccount);

  const [setupIntent, setSetupIntent] = useState(undefined);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const fetch = async () => {
      const resultAction = await dispatch(fetchAccountSetupIntent(account.id))
      if (fetchAccountSetupIntent.fulfilled.match(resultAction)) {
        setSetupIntent(resultAction.payload);
      } else {
        setErrors({'non_field_errors': 'Unable to reach payment processor.'})
      }
    }
    fetch()
  }, [dispatch, account.id]);

  const handleSubmit = async () => {
    setStatus('pending');
    if (!stripe || !elements || !setupIntent) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setStatus('failed');
      return;
    }

    const result = await stripe.confirmCardSetup(setupIntent.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Display result.error.message in your UI.
      setStatus('failed');
      setErrors({'credit-card': result.error.message})
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      const resultAction = await dispatch(updateAccountPaymentMethod({
        accountId: account.id,
        newPaymentMethodId: result.setupIntent.payment_method
      }));
      console.log(resultAction);
      if (updateAccountPaymentMethod.fulfilled.match(resultAction)){
        setStatus('succeeded');
        setTimeout(() => {
          close()
        }, 2000);
      } else {
        setErrors({'non_field_errors': 'Unable to update payment method.'});
      }
    }
  }

  let content
  if (status === 'succeeded') {
    content = <Box width="large" pad="small"><Message type="success" message="Credit card successfully updated." /></Box>
  } else {
    content = (
        <Form
          onSubmit={handleSubmit}
          data-cy="credit-card-form"
          errors={errors}
        >
          <Box width="large">
            {(errors['non_field_errors'] && <Message type="error" message={errors['non_field_errors']} />)}
            <StripeCreditCardField autoFocus label="" />
            <Box background="background-contrast" justify="end" gap="large" direction="row" pad="small">
              <CancelButton onClick={close} />
              <SubmitButton disabled={!setupIntent} loadingIndicator={status === 'pending'} label="Update" />
            </Box>
          </Box>
        </Form>
    )
  }

  return (
    <Modal title="Update Credit Card" close={close}>
      {content}
    </Modal>
  )
};

export default AccountCreditCard;
