import { Box, FormField, Select, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React from 'react';
import { formatHour } from '../utils';
import Pill from './Pill';

const HourMultipleSelect = ({ value }) => {

  const hours = [...Array(24).keys()]

  const CustomSelect = () => {
    const selectedHours = value;
    let content
    if (selectedHours.length === 0) {
      // Nothing selected. Render placeholder
      content = <Text weight="bold" color="placeholder">Select Hour(s)</Text>
    } else {
      // At least one hour is selected.
      var items = [];
      var current = [];
      var previous = undefined;
      selectedHours.forEach((hour) => {
        if (current.length === 0) {
          current.push(hour);
          previous = hour;
        } else if (hour - previous === 1) {
          // Consecutive!
          current.push(hour);
        } else {
          // Not consecutive!
          items.push(current);
          current = [hour];
        }
        previous = hour;
      });
      items.push(current);
      if (items.length === 0) {
        content = <Text weight="bold" color="placeholder">Select Hour(s)</Text>
      } else {
        content = items.map((item, index) => {
          if (item.length === 1) {
            return <Pill key={index} text={formatHour(item[0])} />
          } else {
            return <Pill key={index} text={`${formatHour(item[0])} - ${formatHour(item[item.length - 1])}`} />
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
    <FormField name="byhour" fill="horizontal">
      <Select
        name="byhour"
        options={hours}
        multiple
        closeOnChange={false}
        children={(option, index, options, { active, disabled, selected }) => {
          if (selected) {
            return (<Box key={index} background="selected" pad="small" direction="row" justify="between">{formatHour(option)}<Checkmark /></Box>)
          } else {
            return (<Box key={index} pad="small">{formatHour(option)}</Box>)
          }
        }}
        valueLabel={<CustomSelect />}
      />
    </FormField>

  )

};

export default HourMultipleSelect
