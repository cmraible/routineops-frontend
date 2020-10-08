import { Box, Button, Form, FormField, MaskedInput, Heading, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React, { useState } from 'react';

const VerifyPhoneNumberModal = ({ phoneNumber, onClose, onSave }) => {

  const [value, setValue] = useState({
    check: '',
    to: phoneNumber
  });

  const handleSubmit = () => {
    onSave(value);
  }

  return (
    <Layer position="center" modal={true} onEsc={onClose} onClickOutside={onClose}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium" gap="medium">
        <Heading>Verification</Heading>
        <Form 
          value={value}
          onSubmit={handleSubmit}
          onChange={nextValue => setValue(nextValue)}
        >
          <FormField name="check" label="Verification Code">
            <MaskedInput 
              mask={[{
                length: 6,
                regexp: /^[0-9]{1,6}$/,
                placeholder: 'XXXXXX'
              }]}
              name="check"
            />
          </FormField>
          <Button type="submit" label="Verify" />
        </Form>
      </Box>
    </Layer>
  )

};

export default VerifyPhoneNumberModal;
