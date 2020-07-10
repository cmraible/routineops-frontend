import { startOfToday } from 'date-fns';
import { Box } from 'grommet';
import { StatusCritical, StatusGood, StatusWarning, Subtract } from 'grommet-icons';
import React from 'react';

const WeekViewCell = ({ score, instances, date }) => {

  const count = instances.length
  const today = startOfToday
  const past = date < today
  const completed = instances.every((instance) => instance.completed)
  const ontime = instances.every((instance) => instance.completed < instance.due)
  const late = instances.some((instance) => instance.completed > instance.due)

  if (completed && ontime && count) {
    return (
      <Box align="center" background="status-ok" fill pad="small">
        <StatusGood color="white" />
      </Box>
    )
  } else if (completed && late) {
    return (
      <Box align="center" background="status-ok" fill pad="small">
        <StatusWarning color="status-critical" />
      </Box>
    )
  } else if (!completed && past) {
    return (
      <Box align="center" background="status-critical" fill pad="small">
        <StatusCritical color="white" />
      </Box>
    )
  } else if (count)  {
    return (
      <Box align="center" background="status-warning" fill pad="small">
        <Subtract />
      </Box>
    )
  } else {
    return (
      <Box align="center" background="status-disabled" fill pad="small">
        <Subtract />
      </Box>
    )
  }
};

export default WeekViewCell;
