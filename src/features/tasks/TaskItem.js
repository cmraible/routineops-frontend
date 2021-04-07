import React from 'react';
import { Box, Text } from 'grommet';
import { Checkmark } from 'grommet-icons';
import { useSelector } from 'react-redux';
import { selectTaskById } from './tasksSlice';

const TaskItem = ({id}) => {
    const task = useSelector(state => selectTaskById(state, id));
    return (
      <Box align="start" pad="small">
        <Box direction="row" align="center" gap="medium">
          <Checkmark /><Text>{task.name}</Text>
        </Box>
      </Box>
    )
  }

export default TaskItem;