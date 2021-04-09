import { push } from 'connected-react-router';
import { Box, CheckBox, Text } from 'grommet';
import { Tasks } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskLayerById } from '../taskLayers/taskLayersSlice';
import { selectTaskById } from '../tasks/tasksSlice';
import { selectTaskInstanceById, completeTaskInstance, updateTaskInstance } from './taskInstancesSlice';


const TaskInstanceItem = ({id}) => {
    const dispatch = useDispatch();
    const taskInstance = useSelector(state => selectTaskInstanceById(state, id));
    const layer = useSelector(state => selectTaskLayerById(state, taskInstance.taskLayer))
    const task = useSelector(state => selectTaskById(state, layer.task));

    const formattedDueDate = DateTime.fromISO(taskInstance.due).toLocaleString(DateTime.DATETIME_SHORT);

    const [requestStatus, setRequestStatus] = useState('idle');

    const [checked, setChecked] = useState(taskInstance.completed ? true : false);

    const onChange = async (event) => {
        setRequestStatus('pending');
        setChecked(event.target.checked)
        if (event.target.checked) {
            // Complete the task
            const resultAction = await dispatch(completeTaskInstance([taskInstance, []]))
            if (completeTaskInstance.fulfilled.match(resultAction)) {
                setRequestStatus('succeeded');
            } else {
                setRequestStatus('failed');
                setChecked(taskInstance.completed ? true : false);
            }
        } else {
            // Un-Complete the task?
            const resultAction = await dispatch(updateTaskInstance({...taskInstance, completed: null}))
            if (updateTaskInstance.fulfilled.match(resultAction)) {
                setRequestStatus('succeeded')
            } else {
                setRequestStatus('failed');
                setChecked(taskInstance.completed ? true : false)
            }
        }
    }


    let content
    if (task.type === 'TODO') {
        content = (
            <Box
                direction="row"
                align="center"
                gap="medium"
                pad={{horizontal: "small"}}
                fill
            >
                <CheckBox
                    checked={checked}
                    onChange={onChange}
                    disabled={requestStatus === 'pending'}
                />
                <Box
                    direction="row"
                    justify="between"
                    fill="horizontal"
                    pad="small"
                >
                    <Text>{task.name}</Text>
                    <Text style={{whiteSpace: 'noWrap'}}>{formattedDueDate}</Text>
                </Box>
            </Box>
        )
    } else {
        content = (
            <Box
                direction="row"
                align="center"
                gap="medium"
                fill
            >
                <Tasks />
                <Box
                    direction="row"
                    gap="small"
                    justify="between"
                    fill="horizontal"
                    pad="small"
                    onClick={() => task.type !== 'TODO' ? dispatch(push(`/taskInstance/${id}`)) : void(0)}
                >
                    <Text>{task.name}</Text>
                    <Text style={{whiteSpace: 'noWrap'}}>{formattedDueDate}</Text>
                </Box>
            </Box>
        )
    }


    return (
      <Box
            direction="row"
            fill
            border="bottom"
            hoverIndicator
        >
            {content}
        </Box>
    )
  }

export default TaskInstanceItem;