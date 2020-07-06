import React from 'react';
import { Box, Button,  Select } from 'grommet';
import { tonight } from 'date-fns';
import { RRule } from 'rrule';
import { endOfToday } from 'date-fns';


const RecurrenceInput = ({roles}) => {
  console.log(roles)
  const tonight = endOfToday()
  const frequency_options = [
    {
      label: ' ',
      rule: ''
    },
    {
      label: 'Daily',
      rule: new RRule({
        freq: RRule.DAILY,
        dtstart: tonight,
      }).toString()
    },
    {
      label: 'Weekly',
      rule: new RRule({
        freq: RRule.WEEKLY,
        dtstart: tonight,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Bi-Weekly',
      rule: new RRule({
        freq: RRule.WEEKLY,
        dtstart: tonight,
        interval: 2,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Monthly',
      rule: new RRule({
        freq: RRule.MONTHLY,
        dtstart: tonight,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Quarterly',
      rule: new RRule({
        freq: RRule.MONTHLY,
        dtstart: tonight,
        interval: 3,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Yearly',
      rule: new RRule({
        freq: RRule.YEARLY,
        dtstart: tonight,
        bysetpos: -1
      }).toString()
    }
  ]

  return (
    <Box pad="medium" direction="row" gap="medium">
      <Select 
        options={roles}
        placeholder="Role" 
        labelKey="name"
      />
      <Select 
        options={frequency_options}
        placeholder="Frequency"
        labelKey="label"
      />
      
      <Button type="submit" primary label="Save" />
    </Box>
    
  )

};

export default RecurrenceInput;
