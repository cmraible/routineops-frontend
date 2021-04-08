import { Box, Button } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Modal from '../../components/Modal';
import { deleteRole, selectRoleById } from './rolesSlice';

const RoleDelete = ({ id, close }) => {

    const dispatch = useDispatch();
    const role = useSelector(state => selectRoleById(state, id))
    const [errors, setErrors] = useState();

    const handleSubmit = async () => {
        const resultAction = await dispatch(deleteRole(id));
        if (deleteRole.fulfilled.match(resultAction)) {
            close()
        } else {
            setErrors(true)
        }
    }

    return (
        <Modal
            close={close}
            title={`Are you sure you want to delete the role: ${role.name}?`}
        >
            {(errors && <Message type="error" message="Unable to delete role at this time." />)}
            <Box width="large" pad="medium">
                <Message type="warning" message="Deleting this role will also delete all past and future task instances assigned to this role. This action cannot be undone." />
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
                        label="Delete Role"
                        onClick={handleSubmit}
                        color="status-critical"
                    />
                </Box>
        </Modal>
    )
}

export default RoleDelete;