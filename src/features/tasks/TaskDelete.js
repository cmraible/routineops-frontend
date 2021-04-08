import { Box, Button } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import { deleteTask, selectTaskById } from './tasksSlice';

const TaskDelete = ({ id, close }) => {

    const dispatch = useDispatch();
    const task = useSelector(state => selectTaskById(state, id))

    const [errors, setErrors] = useState();

    const handleSubmit = async () => {
        const resultAction = await dispatch(deleteTask(id));
        if (deleteTask.fulfilled.match(resultAction)) {
            close()
        } else {
            setErrors(true)
        }
    }

    return (
        <Modal
            close={close}
            title={`Are you sure you want to delete the task: ${task.name}?`}
        >
            {(errors && <Message type="error" message="Unable to delete task at this time." />)}
            <Box width="large" pad="medium">
                <Message type="warning" message="Deleting this task will also delete all past and future task instances associated with the task. This action cannot be undone." />
            </Box>
            <Box
                direction="row"
                justify="end"
                gap="medium"
                background="background-contrast"
                pad="small"
            >
                    <Button
                        size="large"
                        label="Cancel"
                        onClick={close}
                    />
                    <Button
                        primary
                        size="large"
                        label="Delete Task"
                        onClick={handleSubmit}
                        color="status-critical"
                    />
                </Box>
        </Modal>
    )
}

export default TaskDelete;