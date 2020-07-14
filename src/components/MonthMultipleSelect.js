import { format } from 'date-fns';
import { Box, FormField, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';


const MonthMultipleSelect = () => {

  const months = [...Array(12).keys()]


  const options = months.map((monthnumber) => {
    const date = new Date(2020, monthnumber, 1)
    return {
      label: format(date, 'MMMM'),
      value: monthnumber+1
    }
  })
  console.log(options)

  return (
    <FormField name="bymonth" label="Which month(s)?">
      <Select 
        name="bymonth"
        options={options}
        placeholder="Select Months (optional)"
        multiple
        closeOnChange={false}
        children={(option, index, options, { active, disabled, selected }) => {
          if (selected) return (<Box background="selected" pad="small" direction="row" justify="between">{option.label}<Checkmark /></Box>)
          else return (<Box pad="small">{option.label}</Box>)
        }}
        valueKey={{
          key: 'value',
          reduce: true
        }}
      />
    </FormField>
    
  )

};

export default MonthMultipleSelect
