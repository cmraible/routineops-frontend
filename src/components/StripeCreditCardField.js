import { Box, FormField } from 'grommet';
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';



const StripeCreditCardField = ( {darkMode} ) => {

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
      <FormField gap="medium">
        <CardElement options={options} required />
      </FormField>
    </Box>
    
  )
}

export default StripeCreditCardField;
