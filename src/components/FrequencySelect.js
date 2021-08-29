import { FormField, Select } from 'grommet';
import React from 'react';


const FrequencySelect = ({ onChange }) => {

  const frequency_options = [
    'Once',
    'Daily',
    'Weekly',
    'Bi-Weekly',
    'Monthly',
    'Yearly'
  ]

  return (
    <FormField name="label" required fill="horizontal">
      <Select
        name="label"
        options={frequency_options}
        placeholder="Select Frequency"
        onChange={onChange || undefined}
      />
    </FormField>
  )

};

export default FrequencySelect
