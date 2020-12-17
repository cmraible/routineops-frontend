import { TextArea, FormField } from 'grommet';
import React from 'react';
import Spinner from './Spinner';

const InlineTextArea = ({ name, icon, label, onBlur, placeholder, size, value, isFetching, required }) => {

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
        icon={<Spinner color="status-unknown" isFetching={isFetching} />}
        reverse
        resize={false}
        />
    </FormField>

  )
}

export default InlineTextArea;
