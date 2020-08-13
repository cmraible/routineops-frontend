import { startOfToday } from 'date-fns';
import { Box } from 'grommet';
import { Close, Checkmark, Subtract } from 'grommet-icons';
import React from 'react';

const WeekViewCell = ({ score, instances, date }) => {

  const count = instances.length
  const today = startOfToday()
  const past = date < today
  const completed = instances.every((instance) => instance.completed)
  const ontime = instances.every((instance) => instance.completed < instance.due)
  const late = instances.some((instance) => instance.completed > instance.due)

  if (completed && ontime && count) {
    return (
      <Box align="center" background="status-ok" fill pad="small">
        <Checkmark color="white" />
      </Box>
    )
  } else if (completed && late) {
    return (
      <Box align="center" fill pad="small">
        <Checkmark color="status-critical" />
      </Box>
    )
  } else if (!completed && past) {
    return (
      <Box align="center" background="status-critical" fill pad="small">
        <Close color="white" />
      </Box>
    )
  } else if (count)  {
    return (
      <Box align="center" background="status-scheduled" fill pad="small">
        <Subtract color="status-scheduled" />
      </Box>
    )
  } else {
    return (
      <Box align="center" background="background" fill pad="small">
        <Subtract color="background" />
      </Box>
    )
  }
};

export default WeekViewCell;
