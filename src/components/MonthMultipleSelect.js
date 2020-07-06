import React from 'react';
import { Box, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { format } from 'date-fns';


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
  )

};

export default MonthMultipleSelect
