import React, { useState } from 'react';
import { Box, Menu, Text } from 'grommet';
import { Checkmark, FormEdit, FormTrash, More } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskById } from './tasksSlice';
import { push } from 'connected-react-router';
import TaskDelete from './TaskDelete';


const TaskItem = ({id}) => {
    const dispatch = useDispatch();
    const task = useSelector(state => selectTaskById(state, id));

    const [showDelete, setShowDelete] = useState(false);


    return (
      <Box
            direction="row"
            fill
            pad={{horizontal: "small"}}
            border="bottom"
            hoverIndicator
        >
            <Box
                pad="small"
                direction="row"
                align="center"
                gap="medium"
                fill
                onClick={() => dispatch(push(`/tasks/${id}`))}
            >
                <Checkmark /><Text>{task.name}</Text>
            </Box>
            <Menu
                size="small"
                icon={<More />}
                dropAlign={{"right": "right", "top": "bottom"}}
                alignSelf="end"
                items={[
                    {label: "Edit", icon: <FormEdit />, gap: "small", onClick: () => dispatch(push(`/tasks/${id}/edit`))},
                    {label: "Delete", icon: <FormTrash />, gap: "small", size: "small", onClick: () => setShowDelete(true)}
                ]}
            />
            {(showDelete && <TaskDelete id={id} close={() => setShowDelete(false)} />)}

        </Box>
    )
  }

export default TaskItem;