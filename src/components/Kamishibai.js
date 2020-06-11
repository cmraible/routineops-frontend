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
              M
            </TableCell>
            <TableCell align="center">
              T
            </TableCell>
            <TableCell align="center">
              W
            </TableCell>
            <TableCell align="center">
              T
            </TableCell>
            <TableCell align="center">
              F
            </TableCell>
            <TableCell align="center"f>
              S
            </TableCell>
            <TableCell align="center">
              S
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
