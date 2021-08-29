import { TextArea, FormField } from 'grommet';
import React from 'react';

const InlineTextArea = ({ name, label, onBlur, placeholder, size, value, isFetching, required }) => {

  return (
    <FormField
      name={name}
      label={label}
      required={ (required) ? true : false }
    >
      <TextArea
        name={name}
        placeholder={placeholder}
        size={size}
        value={value}
        onBlur={onBlur}
        reverse
        resize={false}
        />
    </FormField>

  )
}

export default InlineTextArea;
