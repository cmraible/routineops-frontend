import { FormField, TextInput } from 'grommet';
import React from 'react';

const PasswordField = ({ label, name, validate, autoFocus, ...rest }) => {

  const fieldLabel = (label) ? label : 'Password';
  const fieldName = (name) ? name : 'password'

  const validatePassword = (value, formvalue) => {
    if (validate === false) return true
    if (value.length >= 9) {
      return true
    } else {
      return {
        'message': 'Passwords must be at least 9 characters long.',
        'status': 'error'
      }
    }
  }

  return (
    <FormField
      name={fieldName}
      validate={validatePassword}
      label={fieldLabel}
      fill="horizontal"
      {...rest}
    >
      <TextInput autoFocus={autoFocus} name={fieldName} type="password" />
    </FormField>
  )
}

export default PasswordField;
