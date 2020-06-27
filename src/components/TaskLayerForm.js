import React, { useState } from 'react';
import { Form, Select, Text } from 'grommet';
import { RRule } from 'rrule';
import { addTaskLayer, saveTaskLayer } from '../actions/taskLayer.actions';



const TaskLayerForm = ({ organization, task, role, taskLayer, saveFunction, addFunction, deleteFunction }) => {

  const frequency_options = [
    {
      label: ' ',
      rule: ''
    },
    {
      label: 'Daily',
      rule: new RRule({
        freq: RRule.DAILY,
        byweekday: organization.working_days
      }).toString()
    },
    {
      label: 'Weekly',
      rule: new RRule({
        freq: RRule.WEEKLY,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Bi-Weekly',
      rule: new RRule({
        freq: RRule.WEEKLY,
        interval: 2,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Monthly',
      rule: new RRule({
        freq: RRule.MONTHLY,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Quarterly',
      rule: new RRule({
        freq: RRule.MONTHLY,
        interval: 3,
        bysetpos: -1
      }).toString()
    },
    {
      label: 'Yearly',
      rule: new RRule({
        freq: RRule.YEARLY,
        bysetpos: -1
      }).toString()
    }
  ]

  const [value, setValue] = useState({
    id: (taskLayer) ? taskLayer.id : null,
    organization: organization.id,
    role: role.id,
    task: task.id,
    recurrence: (taskLayer) ? taskLayer.recurrence : false
  });

  return (
    <Form
      value={value}
      onChange={ (nextValue) => {
        setValue(nextValue)
        if (taskLayer && nextValue.recurrence) {
          saveFunction(nextValue)
        } else if (nextValue.recurrence) {
          addFunction(nextValue)
        } else {
          deleteFunction(taskLayer.id)
        }
      }}
    >
      <Select
        name="recurrence"
        options={frequency_options}
        valueKey={{
          key: 'rule',
          reduce: true
        }}
        labelKey="label"
      />
    </Form>

  )

};

export default TaskLayerForm;
