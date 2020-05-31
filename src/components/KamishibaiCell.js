import React from 'react';
import { Button, TableCell } from 'grommet';
import { Alert, Checkmark, Clock, Close, Subtract } from 'grommet-icons';


const KamishibaiCell = (props) => {

  const { status } = props



  switch (status) {
    case "success":
      return (
              <TableCell
                align="center"
                as={Button}
                background="green"
                icon=<Checkmark color="white"/>
                fill="true"
                hoverIndicator="true"
                justify="center"
                pad="none"
              >
              </TableCell>
      )
    case "fail":
      return (
              <TableCell
                align="center"
                as={Button}
                background="red"
                icon=<Close color="white"/>
                fill="true"
                hoverIndicator="true"
                justify="center"
                pad="none"
              >
              </TableCell>
      )
    case "warning":
      return (
              <TableCell
                align="center"
                as={Button}
                background="orange"
                icon=<Alert color="black"/>
                fill="true"
                hoverIndicator="true"
                justify="center"
                pad="none"
              >
              </TableCell>
      )
    case "scheduled":
      return (
              <TableCell
                align="center"
                as={Button}
                background="gray"
                icon=<Clock color="white"/>
                fill="true"
                hoverIndicator="true"
                justify="center"
                pad="none"
              >
              </TableCell>
      )
    default:
      return (
              <TableCell
                align="center"
                as={Button}
                background="gray"
                icon=<Subtract color="white"/>
                fill="true"
                hoverIndicator="true"
                justify="center"
                pad="none"
              >
              </TableCell>
      )
  }



};
export default KamishibaiCell;
