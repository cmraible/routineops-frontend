import { addHours, format, startOfDay } from 'date-fns';
import { Box, Select } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';


const HourMultipleSelect = () => {

  const midnight = startOfDay(new Date())

  const hours = [...Array(24).keys()].map((hour) => {
    return {
      date: addHours(midnight, hour),
      value: hour
    }
  })

  return (
    <Select 
      name="byhour"
      options={hours}
      placeholder="Select Hour(s) (optional)"
      multiple
      closeOnChange={false}
      children={(option, index, options, { active, disabled, selected }) => {
        if (selected) return (<Box background="selected" pad="small" direction="row" justify="between">{format(option.date, 'h:mm aa')}<Checkmark /></Box>)
        else return (<Box pad="small">{format(option.date, 'h:mm aa')}</Box>)
      }}
      valueKey={{
        key: 'value',
        reduce: true
      }}
    />
  )

};

export default HourMultipleSelect
