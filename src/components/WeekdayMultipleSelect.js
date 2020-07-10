import { Box, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';
import { RRule } from 'rrule';


const WeekdayMultipleSelect = () => {

  const days = [
    {
      label: 'Monday',
      value: RRule.MO.weekday
    },
    {
      label: 'Tuesday',
      value: RRule.TU.weekday
    },
    {
      label: 'Wednesday',
      value: RRule.WE.weekday
    },
    {
      label: 'Thursday',
      value: RRule.TH.weekday
    },
    {
      label: 'Friday',
      value: RRule.FR.weekday
    },
    {
      label: 'Saturday',
      value: RRule.SA.weekday
    },
    {
      label: 'Sunday',
      value: RRule.SU.weekday
    },
  ]

  console.log(days)

  return (
    <Select 
      name="byweekday"
      options={days}
      placeholder="Select Weekday(s) (optional)"
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

export default WeekdayMultipleSelect
