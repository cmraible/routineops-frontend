import React from 'react';
import { TableCell } from 'grommet';
import { Checkmark, Close, Clock,  Subtract } from 'grommet-icons';
import { rrulestr } from 'rrule';
import { endOfDay, startOfDay } from 'date-fns';


const WeekViewCell = ({ date, taskLayer, status }) => {

  const recurrence = rrulestr(taskLayer.recurrence)
  const scheduled = recurrence.between(startOfDay(date), endOfDay(date))
  if (scheduled.length > 0) {
    return (
      <TableCell align="center" background="status-warning" fill pad="small">
        <Clock color="white" />
      </TableCell>
    )
  }
  

  switch(status) {
    case 'OK':
      return (
        <TableCell align="center" background="status-ok" fill pad="small">
          <Checkmark color="white" />
        </TableCell>
      )
    case 'OVERDUE':
      return (
        <TableCell align="center" background="status-critical" fill pad="small">
          <Close color="white" />
        </TableCell>
      )
    default:
      return (
        <TableCell align="center" background="status-disabled" fill pad="small">
          <Subtract color="white" />
        </TableCell>
      )
  }



};

export default WeekViewCell;
