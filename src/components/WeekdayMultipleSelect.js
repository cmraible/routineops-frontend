import { Box, FormField, Select, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';
import { days } from '../utils';
import Pill from './Pill';


const WeekdayMultipleSelect = ({ value }) => {

  const CustomSelect = () => {
    const selectedDays = days.filter((day) => {
      return value.some((selectedDay) => selectedDay === day.value)
    }).sort((a, b) => {
      return a.value - b.value;
    });

    let content
    if (selectedDays.length === 0) {
      // Nothing selected. Render placeholder
      content = <Text weight="bold" color="placeholder">Select Weekday(s)</Text>
    } else {
      // At least one day selected. Loop and render intelligently
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
        content = <Text weight="bold" color="placeholder">Select Weekday(s)</Text>
      } else {
        content = items.map((item, index) => {
          if (item.length === 1) {
            return <Pill key={index} text={item[0].short} />
          } else {
            return <Pill key={index} text={`${item[0].short} - ${item[item.length - 1].short}`} />
          }
        });
      }
    }

    return (
      <Box direction="row" gap="xxsmall" pad="small">
        { content }
      </Box>
    )
  }

  return (
    <FormField name="byweekday" fill="horizontal">
      <Select
        name="byweekday"
        options={days}
        multiple
        closeOnChange={false}
        children={(option, index, options, { active, disabled, selected }) => {
          if (selected) return (<Box background="selected" pad="small" direction="row" justify="between">{option.label}<Checkmark /></Box>)
          else return (<Box pad="small">{option.label}</Box>)
        }}
        valueKey={{ key: 'value', reduce: true }}
        valueLabel={<CustomSelect />}
      />
    </FormField>
  )
};

export default WeekdayMultipleSelect
