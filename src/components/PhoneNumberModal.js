import { Box, Button, Form, FormField, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneNumberModal.css';




const PhoneNumberModal = ({ organization, onClose, onSave, initialValue }) => {

  const [value, setValue] = useState(initialValue);

  const handleSubmit = () => {
    onSave(value);
  }

  return (
    <Layer position="center" modal={true} onEsc={onClose} onClickOutside={onClose}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium" gap="medium">
        <Heading>Mobile Number</Heading>
      <Form
        onSubmit={handleSubmit}
      >
        <FormField pad={true}>
          <PhoneInput value={value} onChange={setValue} defaultCountry="US" />
        </FormField>
        <Button type="submit" primary fill="horizontal" label="Save" />
      </Form>
      </Box>
    </Layer>
        
  )

};

export default PhoneNumberModal;
