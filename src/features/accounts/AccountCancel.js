import { Button, Box, Form, FormField, TextInput, Heading, Paragraph } from 'grommet';
import React, { useState } from 'react';
import Modal from '../../components/Modal';
import CancelButton from '../../components/CancelButton';


const AccountCancel = ({ close }) => {

  const [value, setValue] = useState('')

  const handleSubmit = ({value}) => {
    console.log(value)
  }

  return (
    <Modal>
      <Heading margin="none" textAlign="center" fill level={2} size="small">Cancel Subscription</Heading>
        <Box pad={{horizontal: "large"}}>
          <Paragraph fill>Are you sure you want to cancel your subscription?</Paragraph>
          <Paragraph fill>Type CANCEL below to cancel.</Paragraph>
        </Box>


        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onSubmit={handleSubmit}
        >
          <FormField name="cancel">
            <TextInput name="cancel" autoFocus placeholder="CANCEL"/>
          </FormField>
          <Box justify="end" gap="large" direction="row">
            <CancelButton onClick={close} label="Close" />
            <Button primary color="status-critical" size="large" disabled={value.cancel !== 'CANCEL'} label="Cancel" />
          </Box>
        </Form>
    </Modal>
  )
};

export default AccountCancel;
