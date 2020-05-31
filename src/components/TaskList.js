import React from 'react';
import { DataTable, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';

const TaskList = () => {

  const columns = [
    {
      align: 'center',
      property: 'status',
      header: <Text>Status</Text>,
      render: datum => (
        <Checkmark />
      )
    },
    {
      align: 'start',
      property: 'title',
      header: <Text>Title</Text>
    },
    {
      align: 'start',
      property: 'assignee',
      header: <Text>Assignee</Text>
    },
    {
      align: 'end',
      property: 'dueDate',
      header: <Text>Due Date</Text>
    }
  ]

  const data = [
    {
      dueDate: 'Monday',
      status: "success",
      title: "Grease the bearings",
      assignee: "Chris Raible"

    },
  ]


  return (
    <DataTable
      columns={columns}
      data={data}
      sortable={true}
    />
  )

};
export default TaskList;
