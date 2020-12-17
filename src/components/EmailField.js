import { FormField, TextInput } from 'grommet';
import React from 'react';

const EmailField = ({ label, name, autoFocus, ...rest }) => {

  const fieldLabel = (label) ? label : 'Email Address';
  const fieldName = (name) ? name : 'email'

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) || !email;
  }

  const validateEmailField = (value, formvalue) => {
    if (validateEmail(value)) {
      return true
    } else {
      return {
        'message': 'Enter a valid email address.',
        'status': 'error'
      }
    }
  }

  return (
    <FormField
      name={fieldName}
      validate={validateEmailField}
      label={fieldLabel}
      fill="horizontal"
      {...rest}
    >
      <TextInput autoFocus={autoFocus} name={fieldName} type="email" />
    </FormField>
  )
}

export default EmailField
