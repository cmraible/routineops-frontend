import { Box, FormField, Select, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import Pill from './Pill';
import React from 'react';
import { formatMonthDay } from '../utils';

const MonthDayMultipleSelect = ({ value }) => {

  const days = [...Array(27).keys()]

  const options = [
    {
      value: 1,
      label: 'First'
    },
    {
      value: -1,
      label: 'Last'
    },
    ...days.map((day) => ({
      value: day + 2,
      label: `${formatMonthDay(day + 2)}`
    }
    ))
  ]

  const CustomSelect = () => {
    const selectedDays = options.filter((day) => {
      return value.some((selectedDay) => selectedDay === day.value)
    }).sort((a, b) => {
      // If either a or b is negative, reverse sort so negative appears last
      // Uses javascript ^ (XOR) operator
      return (a.value < 0 ^ b.value < 0) ? (b.value - a.value) : (a.value - b.value)
    })
    let content
    if (selectedDays.length === 0) {
      // Nothing selected. Render placeholder
      content = <Text weight="bold" color="placeholder">Select day(s) of month</Text>
    } else {
      // At least one hour is selected.
      var items = [];
      var current = [];
      var previous = undefined;
      selectedDays.forEach((day) => {
        if (current.length === 0) {
          current.push(day);
          previous = day;
        } else if (day.value - previous.value === 1) {
          // Consecutive!
          current.push(day);
        } else {
          // Not consecutive!
          items.push(current);
          current = [day];
        }
        previous = day;
      });
      items.push(current);
      if (items.length === 0) {
        content = <Text weight="bold" color="placeholder">Select day(s) of month</Text>
      } else {
        content = items.map((item, index) => {
          if (item.length === 1) {
            return <Pill key={index} text={item[0].label} />
          } else {
            return <Pill key={index} text={`${item[0].label} - ${item[item.length - 1].label}`} />
          }
        });
      }
    }
    return (
      <Box direction="row" gap="xxsmall" pad="small">
        {content}
      </Box>
    )
  }

  return (
    <FormField name="bymonthday" fill="horizontal">
      <Select
        name="bymonthday"
        options={options}
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
        valueLabel={<CustomSelect />}
      />
    </FormField>

  )

};

export default MonthDayMultipleSelect
