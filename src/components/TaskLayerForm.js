import { Box, Button, Form } from 'grommet';
import React, { useState } from 'react';
import RRule from 'rrule';
import FrequencySelect from './FrequencySelect';
import HourMultipleSelect from './HourMultipleSelect';
import WeekdayMultipleSelect from './WeekdayMultipleSelect';
import MonthDayMultipleSelect from './MonthDayMultipleSelect';
import MonthMultipleSelect from './MonthMultipleSelect';
import TimeMaskedInput from './TimeMaskedInput';
import { DateTime } from 'luxon';

const TaskLayerForm = ({ organization, task, taskLayer, saveFunction, addFunction, role, successFunction }) => {

  const hourStart = DateTime.local().setZone('utc', { keepLocalTime: true }).startOf('hour').toJSDate()
  const dayEnd = DateTime.local().setZone('utc', { keepLocalTime: true }).endOf('day').toJSDate()
  const weekEnd = DateTime.local().setZone('utc', { keepLocalTime: true }).endOf('week').toJSDate()
  const yearStart = DateTime.local().setZone('utc', { keepLocalTime: true }).startOf('year').toJSDate()
  const quarterEnd = DateTime.local().setZone('utc', { keepLocalTime: true}).endOf('quarter').toJSDate()
  const tz = DateTime.local().zoneName


  const [value, setValue] = useState({
    id: (taskLayer) ? taskLayer.id : null,
    organization: organization.id,
    role: (taskLayer) ? taskLayer.role : role.id || '',
    task: task.id,
    label: (taskLayer) ? taskLayer.label : '',
    frequency: (taskLayer) ? taskLayer.frequency : undefined,
    byhour: (taskLayer) ? taskLayer.byhour : [],
    time: (taskLayer) ? taskLayer.time : '',
    byweekday: (taskLayer) ? taskLayer.byweekday : undefined,
    bymonthday: (taskLayer) ? taskLayer.bymonthday : undefined,
    bymonth: (taskLayer) ? taskLayer.bymonth : undefined,
  });

  const addOrSave = (data) => {
    (taskLayer) ? saveFunction(data) : addFunction(data);
  }
  
  const submitForm = (value) => {
    console.log(value);
    const time = (value.time) ? DateTime.fromFormat(value.time, 't').setZone('utc', {keepLocalTime: true}).toJSDate() : false;
    if (value.label === 'Hourly') {
      const rule = new RRule({
        freq: RRule.HOURLY,
        interval: 1,
        dtstart: hourStart,
        byweekday: value.byweekday,
        byhour: value.byhour,
        tzid: tz
      })
      const data = {
        ...value,
        label: 'Hourly',
        frequency: RRule.HOURLY,
        interval: 1,
        recurrence: rule.toString(),
        dtstart: hourStart,
        bysetpos: [],
        byweekday: value.byweekday,
        bymonthday: [],
        byhour: value.byhour,
        tzid: tz
      };
      addOrSave(data)
    } else if (value.label === 'Daily') {
      const dailydtstart = (time) ? time : dayEnd ;
      const rule = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        dtstart: dailydtstart,
        tzid: tz,
        byweekday: value.byweekday,
        byhour: [],
        bysetpos: [],
        bymonthday: []
      })
      const data = {
        ...value,
        label: 'Daily',
        frequency: RRule.DAILY,
        interval: 1,
        dtstart: dailydtstart,
        byweekday: value.byweekday,
        bymonthday: [],
        bysetpos: [],
        recurrence: rule.toString()
      };
      addOrSave(data)
    } else if (value.label === 'Weekly') {
      const weeklydtstart = (time) ? time : weekEnd ;
      const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 1,
        dtstart: weeklydtstart,
        tzid: tz,
        byweekday: value.byweekday,
        byhour: [],
        bysetpos: [],
        bymonthday: []
      })
      const data = {
        ...value,
        label: 'Weekly',
        frequency: RRule.WEEKLY,
        interval: 1,
        dtstart: weeklydtstart,
        byweekday: value.byweekday,
        bymonthday: [],
        bysetpos: [],
        recurrence: rule.toString()
      };
      addOrSave(data)
    } else if (value.label === 'Bi-Weekly') {
      const weeklydtstart = (time) ? time : weekEnd ;
      const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: 2,
        dtstart: weeklydtstart,
        tzid: tz,
        byweekday: value.byweekday,
        byhour: [],
        bysetpos: [],
        bymonthday: []
      })
      const data = {
        ...value,
        label: 'Bi-Weekly',
        frequency: RRule.WEEKLY,
        interval: 2,
        dtstart: weekEnd,
        bymonthday: [],
        bysetpos: [],
        byweekday: value.byweekday,
        recurrence: rule.toString(),
        byhour: []
      };
      addOrSave(data)
    } else if (value.label === 'Monthly') {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        interval: 1,
        dtstart: dayEnd,
        tzid: tz,
        byweekday: [],
        byhour: [],
        bysetpos: [],
        bymonthday: value.bymonthday,
        bymonth: value.bymonth
      })
      const data = {
        ...value,
        label: 'Monthly',
        frequency: RRule.MONTHLY,
        interval: 1,
        dtstart: dayEnd,
        bymonthday: value.bymonthday,
        byweekday: [],
        recurrence: rule.toString(),
        bysetpos: [],
        bymonth: value.bymonth
      };
      addOrSave(data)
    } else if (value.label === 'Quarterly') {
      const rule = new RRule({
        freq: RRule.MONTHLY,
        interval: 3,
        dtstart: quarterEnd,
        tzid: tz,
        byweekday: [],
        byhour: [],
        bysetpos: [],
        bymonthday: [],
        bymonth: []
      })
      const data = {
        ...value,
        label: 'Quarterly',
        frequency: RRule.MONTHLY,
        interval: 3,
        dtstart: quarterEnd,
        bymonthday: [],
        recurrence: rule.toString(),
        bysetpos: []
      };
      addOrSave(data)
    } else if (value.label === 'Yearly') {
      const rule = new RRule({
        freq: RRule.YEARLY,
        interval: 1,
        dtstart: yearStart,
        tzid: tz,
        byweekday: [],
        byhour: [],
        bysetpos: [],
        bymonthday: value.bymonthday,
        bymonth: value.bymonth
      })
      const data = {
        ...value,
        label: 'Yearly',
        frequency: RRule.YEARLY,
        interval: 1,
        dtstart: yearStart,
        bymonthday: value.bymonthday,
        bymonth: value.bymonth,
        recurrence: rule.toString(),
        bysetpos: []
      };
      addOrSave(data)
    }
    successFunction()
  }

  return (
    <Box pad="small" direction="row" fill="horizontal" flex={false}>
      <Box fill>
        <Form
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          onSubmit={({value}) => {
            submitForm(value)
          }}
        >
          <Box gap="medium" fill>
            <FrequencySelect />
            { (value.label === 'Hourly' && (<Box gap="small"><HourMultipleSelect /> <WeekdayMultipleSelect /></Box>)) }
            { (value.label === 'Daily' &&  (<Box gap="small"><WeekdayMultipleSelect /> <TimeMaskedInput /></Box>)) }
            { (value.label === 'Weekly' &&  (<Box gap="small"><WeekdayMultipleSelect />  <TimeMaskedInput /></Box>))}
            { (value.label === 'Bi-Weekly' &&  (<Box gap="small"><WeekdayMultipleSelect />  <TimeMaskedInput /></Box>))}
            { (value.label === 'Monthly' &&  (<Box gap="small"><MonthDayMultipleSelect /> <MonthMultipleSelect /> </Box>))}
            { (value.label === 'Yearly' &&  (<Box gap="small"><MonthMultipleSelect /><MonthDayMultipleSelect /></Box>))}
            <Button type="submit" label="Save" />
          </Box>
        </Form>
      </Box>
    </Box>
  )
};

export default TaskLayerForm;
