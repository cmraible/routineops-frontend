import { FormField, Select } from 'grommet';
import React from 'react';


const FrequencySelect = () => {

  const frequency_options = ['Hourly', 'Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Yearly']


  return (
    <FormField label="Frequency" name="label" required>
      <Select
        name="label"
        label="frequency"
        options={frequency_options}
        placeholder="Select Frequency"
      />
    </FormField>
    
  )

};

export default FrequencySelect
