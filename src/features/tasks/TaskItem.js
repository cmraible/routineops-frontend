import { push } from 'connected-react-router';
import { Box, CheckBox, Text } from 'grommet';
import { Tasks } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectLayerById } from '../layers/layersSlice';
import { selectRoutineById } from '../routines/routinesSlice';
import { selectActiveUserRoles } from '../userRoles/userRolesSlice';
import UserAvatar from '../users/UserAvatar';
import UserAvatars from '../users/UserAvatars';
import { completeTask, selectTaskById, updateTask } from './tasksSlice';


const TaskItem = ({id}) => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const task = useSelector(state => selectTaskById(state, id));
    const layer = useSelector(state => selectLayerById(state, task.layer))
    const routine = useSelector(state => selectRoutineById(state, layer.routine));

    const userRoles = useSelector(selectActiveUserRoles);
    let assignedUsers = layer.type === 'Shared' ? userRoles.filter((userRole) => userRole.role === layer.role).map((userRole) => userRole.user) : [] ;

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
                fill="horizontal"
                pad="small"
                background={DateTime.fromISO(task.due) < DateTime.local() && !task.completed ? "status-critical" : "none" }
            >
                <Box direction="column" flex="grow">
                    <Box direction="row" gap="medium" fill="horizontal" align="center">
                        <CheckBox
                            checked={checked}
                            onChange={onChange}
                            disabled={
                                requestStatus === 'pending' || 
                                (task.assignee !== user.id && layer.type === 'Individual') ||
                                (layer.type === 'Shared' && !assignedUsers.some(u => u === user.id))
                            }
                        />
                        <Box align="start" fill="horizontal">
                            <Text style={{lineHeight: '20px'}} size="medium" weight="bold" margin="none">{routine.name}</Text>
                            <Text margin="none" style={{whiteSpace: 'noWrap', lineHeight: '10px'}} size="xsmall" color="text-xweak">{formattedDueDate}</Text>
                        </Box>
                    </Box>
                </Box>
                
                <Box
                    direction="row"
                    justify="end"
                    fill="horizontal"
                    width="small"
                    flex="shrink"
                >
                    <Box direction="row" gap="medium" justify="center" align="center">
                        {layer.type === 'Individual' && <UserAvatar size="small" id={task.assignee} tip link />}
                        {layer.type === 'Shared' && <UserAvatars size="small" ids={assignedUsers} tip="Shared" link />}
                    </Box>
                    
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
            fill="horizontal"
            hoverIndicator
            flex={false}
        >
            {content}
        </Box>
    )
  }

export default TaskItem;