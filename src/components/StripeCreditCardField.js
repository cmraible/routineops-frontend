import { CardElement } from '@stripe/react-stripe-js';
import { Box, FormField, ThemeContext } from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';



const StripeCreditCardField = ( {label, autoFocus} ) => {

  const darkMode = useSelector(state => state.ui.darkMode)


  const [ready, setReady] = useState(0)
  const [focus, setFocus] = useState(autoFocus ? true : false);
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);

  let borderColor;
  if (complete) {
    borderColor = "status-ok"
  } else if (focus) {
    borderColor = "selected"
  } else {
    borderColor = "border"
  }

  const options = {
    style: {
      base: {
        iconColor: (darkMode) ? "#FFFFFF" : "#000000",
        fontWeight: 600,
        color: (darkMode) ? "#FFFFFF" : "#000000",
        fontSmoothing: "antialiased",
        fontSize: "18px",
        "::placeholder": {
          color: "#AAAAAA",
        },
      },
      invalid: {
        color: "#FF4040",
        iconColor: "#FF4040",
      }
    },
  };

  return (
    <ThemeContext.Extend value={{ formField: { border: { color: borderColor}}}}>
      <Box pad="small">
        <FormField error={error} name="credit-card" pad={true} gap="small" label={(label) ? label : undefined}>
          <CardElement
            data-cy="credit-card"
            options={options}
            onReady={(element) => {
              if (autoFocus && ready === 0) {
                element.focus()
              }
              setReady(1)
            } }
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(obj) => {
              if (obj.error) {
                setError(obj.error.message)
                setComplete(false)
              } else if (obj.complete) {
                setError('');
                setComplete(true);
              } else {
                setComplete(false)
                setError('');
              }
            }}
          />
        </FormField>
      </Box>
    </ThemeContext.Extend>


  )
}

export default StripeCreditCardField;
