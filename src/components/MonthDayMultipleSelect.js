import { Box, FormField, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';


const MonthDayMultipleSelect = () => {

  const days = [...Array(27).keys()]

  const options = [
    {
      label: 'First',
      value: 1  
    },
    {
      label: 'Last',
      value: -1
    },
    ...days.map((day) => ({
      value: day + 2,
      label: `${day + 2}`
    }
    ))
  ]
  console.log(options)

  return (
    <FormField label="Which day(s)?" name="bymonthday">
      <Select 
        name="bymonthday"
        options={options}
        placeholder="Select Day(s) of the Month (optional)"
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

export default MonthDayMultipleSelect
