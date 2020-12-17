import { TextInput, FormField } from 'grommet';
import React from 'react';
import Spinner from './Spinner';

const InlineInput = ({ name, autoFocus, icon, onBlur, label, placeholder, size, value, isFetching, required }) => {

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
        icon={<Spinner color="status-unknown" isFetching={isFetching} />}
        reverse
        />
    </FormField>

  )
}

export default InlineInput;
