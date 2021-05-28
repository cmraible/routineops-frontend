import { push } from 'connected-react-router';
import { Box, CheckBox, Text } from 'grommet';
import { Tasks } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskLayerById } from '../taskLayers/taskLayersSlice';
import { selectRoutineById } from '../routines/routinessSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectTaskInstanceById, completeTaskInstance, updateTaskInstance } from './taskInstancesSlice';


const TaskInstanceItem = ({id}) => {
    const dispatch = useDispatch();
    const taskInstance = useSelector(state => selectTaskInstanceById(state, id));
    const layer = useSelector(state => selectTaskLayerById(state, taskInstance.taskLayer))
    const routine = useSelector(state => selectRoutineById(state, layer.routine));
    const user = useSelector(selectLoggedInUser);

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
    if (routine.type === 'TODO') {
        content = (
            <Box
                direction="row"
                align="center"
                gap="medium"
                pad={{horizontal: "small"}}
                fill
                background={DateTime.fromISO(taskInstance.due) < DateTime.local() && !taskInstance.completed ? "status-critical" : "none" }
            >
                <CheckBox
                    checked={checked}
                    onChange={onChange}
                    disabled={requestStatus === 'pending' || user.id !== taskInstance.assignee}
                />
                <Box
                    direction="row"
                    justify="between"
                    fill="horizontal"
                    pad="small"
                >
                    <Text>{routine.name}</Text>
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
                    onClick={() => routine.type !== 'TODO' ? dispatch(push(`/taskInstance/${id}`)) : void(0)}
                >
                    <Text>{routine.name}</Text>
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