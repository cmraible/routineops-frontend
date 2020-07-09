import React, { useState } from 'react';
import { Box, Button,  Form } from 'grommet';
import { endOfWeek } from 'date-fns';
import FrequencySelect from './FrequencySelect';
import RRule from 'rrule';

const TaskLayerForm = ({ organization, task, taskLayer, saveFunction, addFunction, role, successFunction }) => {

  const now = new Date()
  const hourStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0)
  const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  const weekEnd = endOfWeek(now, {weekStartsOn: 1})

  const [value, setValue] = useState({
    id: (taskLayer) ? taskLayer.id : null,
    organization: organization.id,
    role: (taskLayer) ? taskLayer.role : role.id || '',
    task: task.id,
    label: (taskLayer) ? taskLayer.label : '',
    frequency: (taskLayer) ? taskLayer.frequency : undefined,
    byhour: (taskLayer) ? taskLayer.byhour : [],
    time: (taskLayer) ? taskLayer.time : '',
    byweekday: (taskLayer) ? taskLayer.byweekday : []
  });

  const addOrSave = (data) => {
    (taskLayer) ? saveFunction(data) : addFunction(data);
  }
  
  const submitForm = (value) => {
    console.log(value);
    if (value.label === 'Hourly') {
      const data = {
        ...value,
        label: 'Hourly',
        frequency: RRule.HOURLY,
        interval: 1,
        dtstart: hourStart,
        bysetpos: [],
        bymonthday: []
      };
      addOrSave(data)
    } else if (value.label === 'Daily') {
      const data = {
        ...value,
        label: 'Daily',
        frequency: RRule.DAILY,
        interval: 1,
        dtstart: dayEnd,
        bymonthday: [],
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Weekly') {
      const data = {
        ...value,
        label: 'Weekly',
        frequency: RRule.WEEKLY,
        interval: 1,
        dtstart: weekEnd,
        bymonthday: [],
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Bi-Weekly') {
      const data = {
        ...value,
        label: 'Bi-Weekly',
        frequency: RRule.WEEKLY,
        interval: 2,
        dtstart: weekEnd,
        bymonthday: [],
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Monthly') {
      const data = {
        ...value,
        label: 'Monthly',
        frequency: RRule.MONTHLY,
        interval: 1,
        dtstart: dayEnd,
        bymonthday: [-1],
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Quarterly') {
      const data = {
        ...value,
        label: 'Quarterly',
        frequency: RRule.MONTHLY,
        interval: 3,
        dtstart: dayEnd,
        bymonthday: [-1],
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Yearly') {
      const data = {
        ...value,
        label: 'Yearly',
        frequency: RRule.YEARLY,
        interval: 1,
        bymonthday: [-1],
        bysetpos: []
      };
      addOrSave(data)
    }
    successFunction()
  }

  return (
    <Box pad="small" fill="horizontal">
      <Form
        value={value}
        onChange={ nextValue => setValue(nextValue) }
        onSubmit={({value}) => {
          submitForm(value)
        }}
      >
        <Box gap="medium" fill>
          <FrequencySelect />
          {/* { (value.label === 'Hourly' && (<Box gap="small"><HourMultipleSelect /> <WeekdayMultipleSelect /></Box>))}
          { (value.label === 'Daily' &&  (<Box gap="small"><WeekdayMultipleSelect /> <TimeMaskedInput /></Box>))}
          { (value.label === 'Weekly' &&  (<Box gap="small"><WeekdayMultipleSelect />  <TimeMaskedInput /></Box>))}
          { (value.label === 'Bi-Weekly' &&  (<Box gap="small"><WeekdayMultipleSelect />  <TimeMaskedInput /></Box>))}
          { (value.label === 'Monthly' &&  (<Box gap="small"><MonthDayMultipleSelect /> <MonthMultipleSelect /> </Box>))}
          { (value.label === 'Quarterly' &&  (<Box gap="small"><QuarterDayMultipleSelect /></Box>))}
          { (value.label === 'Yearly' &&  (<Box gap="small"><MonthMultipleSelect /><MonthDayMultipleSelect /></Box>))} */}
          <Button type="submit" label="Save" />
        </Box>   
      </Form>
    </Box>
  )
};

export default TaskLayerForm;
