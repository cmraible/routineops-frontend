import { Box, Form, Heading } from 'grommet';
import StripeCreditCardField from '../../components/StripeCreditCardField';
import Modal from '../../components/Modal';
import React from 'react';
import CancelButton from '../../components/CancelButton';
import SubmitButton from '../../components/SubmitButton';


const AccountCreditCard = ({close}) => {

  const handleSubmit = () => {

  }

  return (
    <Modal close={close}>
      <Heading margin="none" textAlign="center" fill level={2} size="small">Update Credit Card</Heading>
        <Form
          onSubmit={handleSubmit}
        >
          <StripeCreditCardField label="" />
          <Box justify="end" gap="large" direction="row">
            <CancelButton onClick={close} />
            <SubmitButton label="Update" />
          </Box>
        </Form>
    </Modal>
  )
};

export default AccountCreditCard;
