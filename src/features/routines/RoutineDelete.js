import { Box, Button } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import { deleteRoutine, selectRoutineById } from './routinessSlice';

const RoutineDelete = ({ id, close }) => {

    const dispatch = useDispatch();
    const routine = useSelector(state => selectRoutineById(state, id))

    const [errors, setErrors] = useState();

    const handleSubmit = async () => {
        const resultAction = await dispatch(deleteRoutine(id));
        if (deleteRoutine.fulfilled.match(resultAction)) {
            close()
        } else {
            setErrors(true)
        }
    }

    return (
        <Modal
            close={close}
            title={`Are you sure you want to delete the routine: ${routine.name}?`}
        >
            {(errors && <Message type="error" message="Unable to delete routine at this time." />)}
            <Box width="large" pad="medium">
                <Message type="warning" message="Deleting this routine will also delete all past and future tasks associated with the routine. This action cannot be undone." />
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
                        label="Delete Routine"
                        onClick={handleSubmit}
                        color="status-critical"
                    />
                </Box>
        </Modal>
    )
}

export default RoutineDelete;