import { format } from 'date-fns';
import { Box, FormField, Select, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';
import Pill from './Pill';


const MonthMultipleSelect = ({ value }) => {

  const months = [...Array(12).keys()]

  const options = months.map((monthnumber) => {
    const date = new Date(2020, monthnumber, 1)
    return {
      label: format(date, 'MMMM'),
      short: format(date, 'MMM'),
      value: monthnumber+1
    }
  })

  const CustomSelect = () => {
    const selectedMonths = options.filter((month) => {
      return value.some((selectedMonth) => selectedMonth === month.value)
    }).sort((a, b) => (a.value - b.value))
    let content
    if (selectedMonths.length === 0) {
      // Nothing selected. Render placeholder
      content = <Text weight="bold" color="placeholder">Select month(s)</Text>
    } else {
      // At least one hour is selected.
      var items = [];
      var current = [];
      var previous = undefined;
      selectedMonths.forEach((month) => {
        if (current.length === 0) {
          current.push(month);
          previous = month;
        } else if (month.value - previous.value === 1) {
          // Consecutive!
          current.push(month);
        } else {
          // Not consecutive!
          items.push(current);
          current = [month];
        }
        previous = month;
      });
      items.push(current);
      if (items.length === 0) {
        content = <Text weight="bold" color="placeholder">Select day(s) of the month</Text>
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
        {content}
      </Box>
    )
  }

  return (
    <FormField name="bymonth" fill="horizontal">
      <Select
        name="bymonth"
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

export default MonthMultipleSelect
