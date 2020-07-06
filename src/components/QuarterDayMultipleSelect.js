import React from 'react';
import { Box, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';


const QuarterDayMultipleSelect = () => {

  const days = [...Array(89).keys()]

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
    <Select 
      name="byquarterday"
      options={options}
      placeholder="Select Day(s) of the Quarter (optional)"
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

export default QuarterDayMultipleSelect
