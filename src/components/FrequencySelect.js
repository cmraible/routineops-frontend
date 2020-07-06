import React from 'react';
import { Select } from 'grommet';


const FrequencySelect = () => {

  const frequency_options = ['Hourly', 'Daily', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Yearly']


  return (
    <Select
      name="label"
      label="frequency"
      options={frequency_options}
      placeholder="Select Frequency"
    />
  )

};

export default FrequencySelect
