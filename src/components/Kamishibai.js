import React from 'react';
import { Main, Table, TableBody, TableCell, TableHeader, TableRow } from 'grommet';
import KamishibaiCell from './KamishibaiCell.js'

const Kamishibai = () => {

  return (
    <Main fill="horizontal">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              Role
            </TableCell>
            <TableCell align="center">
              Mon
            </TableCell>
            <TableCell align="center">
              Tue
            </TableCell>
            <TableCell align="center">
              Wed
            </TableCell>
            <TableCell align="center">
              Thu
            </TableCell>
            <TableCell align="center">
              Fri
            </TableCell>
            <TableCell align="center"f>
              Sat
            </TableCell>
            <TableCell align="center">
              Sun
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Mechanic, A</TableCell>
            <KamishibaiCell status="success" />
            <KamishibaiCell status="fail" />
            <KamishibaiCell status="success" />
            <KamishibaiCell status="success" />
            <KamishibaiCell status="success" />
            <KamishibaiCell status="success" />
            <KamishibaiCell status="scheduled"/>
          </TableRow>
        </TableBody>
      </Table>
    </Main>
  )

};
export default Kamishibai;
