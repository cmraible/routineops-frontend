import { TextInput } from 'grommet';
import React from 'react';


const InlineInput = ({ name, icon, onSave, placeholder, size }) => {

  return (
      <TextInput name={name} placeholder={placeholder} icon={icon} plain size={size} onBlur={onSave} />
  )
}

export default InlineInput
