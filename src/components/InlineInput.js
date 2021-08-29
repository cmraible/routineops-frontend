import { TextInput, FormField } from 'grommet';
import React from 'react';

const InlineInput = ({ name, autoFocus, onBlur, label, placeholder, size, value, isFetching, required }) => {

  return (
    <FormField
      name={name}
      required={ (required) ? true : false }
      label={label}
    >
      <TextInput
        autoFocus={autoFocus}
        name={name}
        placeholder={placeholder}
        plain
        size={size}
        value={value}
        onBlur={onBlur}
        reverse
        />
    </FormField>

  )
}

export default InlineInput;
