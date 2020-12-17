import { Box, FormField } from 'grommet';
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';



const StripeCreditCardField = ( {label} ) => {

  const darkMode = useSelector(state => state.ui.darkMode)

  const options = {
    style: {
      base: {
        color: (darkMode) ? "#FFFFFF" : "#000000",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <Box pad="small">
      <FormField pad="xsmall" gap="small" label={(label) ? label : undefined}>
        <CardElement options={options} required />
      </FormField>
    </Box>

  )
}

export default StripeCreditCardField;
