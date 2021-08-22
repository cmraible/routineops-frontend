import { push } from 'connected-react-router';
import { Box, CheckBox, Text } from 'grommet';
import { Tasks } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLayerById } from '../layers/layersSlice';
import { selectRoutineById } from '../routines/routinesSlice';
import { completeTask, selectTaskById, updateTask } from './tasksSlice';


const TaskItem = ({id}) => {
    const dispatch = useDispatch();
    const task = useSelector(state => selectTaskById(state, id));
    const layer = useSelector(state => selectLayerById(state, task.layer))
    const routine = useSelector(state => selectRoutineById(state, layer.routine));

    const formattedDueDate = DateTime.fromISO(task.due).toLocaleString(DateTime.DATETIME_SHORT);

    const [requestStatus, setRequestStatus] = useState('idle');

    const [checked, setChecked] = useState(task.completed ? true : false);

    const onChange = async (event) => {
        setRequestStatus('pending');
        setChecked(event.target.checked)
        if (event.target.checked) {
            // Complete the task
            const resultAction = await dispatch(completeTask([task, []]))
            if (completeTask.fulfilled.match(resultAction)) {
                setRequestStatus('succeeded');
            } else {
                setRequestStatus('failed');
                setChecked(task.completed ? true : false);
            }
        } else {
            // Un-Complete the task?
            const resultAction = await dispatch(updateTask({...task, completed: null}))
            if (updateTask.fulfilled.match(resultAction)) {
                setRequestStatus('succeeded')
            } else {
                setRequestStatus('failed');
                setChecked(task.completed ? true : false)
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
                fill="horizontal"
                pad={{horizontal: "small"}}
                background={DateTime.fromISO(task.due) < DateTime.local() && !task.completed ? "status-critical" : "none" }
            >
                <CheckBox
                    checked={checked}
                    onChange={onChange}
                    disabled={requestStatus === 'pending'}
                />
                <Box
                    direction="row"
                    justify="between"
                    pad="small"
                    fill="horizontal"
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
            >
                <Tasks />
                <Box
                    direction="row"
                    gap="small"
                    justify="between"
                    fill="horizontal"
                    pad="small"
                    onClick={() => routine.type !== 'TODO' ? dispatch(push(`/tasks/${id}`)) : void(0)}
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
            border="bottom"
            hoverIndicator
            flex={false}
        >
            {content}
        </Box>
    )
  }

export default TaskItem;