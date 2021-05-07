import { FormField, TextInput } from 'grommet';
import React from 'react';

const DayMultipleSelect = () => {

  return (
    <FormField name="time" fill="horizontal">
      <TextInput type="time" name="time" />
    </FormField>
  )
};

export default DayMultipleSelect
