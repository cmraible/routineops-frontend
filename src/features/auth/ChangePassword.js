import { Box, Form, Heading, Text } from 'grommet';
import { StatusGood } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Modal from '../../components/Modal';
import PasswordField from '../../components/PasswordField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { changePassword, selectLoggedInUser } from '../auth/authSlice';
import { fetchUser } from '../users/usersSlice';



const ChangePassword = ({ close }) => {

    const user = useSelector(selectLoggedInUser)

    const dispatch = useDispatch()

    const [status, setStatus] = useState('idle')
    const [errors, setErrors] = useState({});


    const handleSubmit = async ({value}) => {
        setStatus('pending');
        setErrors({});
        const resultAction = await dispatch(changePassword(value))
        if (changePassword.fulfilled.match(resultAction)) {
            setStatus('success');
            dispatch(fetchUser(user.id))
            setTimeout(() => close(), 3000)
        } else {
            setStatus('failed')
            if (resultAction.payload) {
                setErrors(flattenErrors(resultAction.payload))
            } else {
                setErrors({'non_field_errors': resultAction.error.message})
            }
        }
    }

    let content
    if (status === 'success') {
        content = (
            <Box gap="medium">
                <Heading margin="none" textAlign="center" fill level={2} size="small">Change Password</Heading>
                <Box direction="row" gap="medium" round="small" pad="small" background={{color: "status-ok", opacity: "weak"}}>
                    <StatusGood color="status-ok" /><Text>Password successfully changed!</Text>
                </Box>
            </Box>
        )
    } else {
        content = (
            <Box gap="medium">
                <Heading margin="none" textAlign="center" fill level={2} size="small">Change Password</Heading>
                <Form
                    errors={errors}
                    onSubmit={handleSubmit}
                >
                    <PasswordField required label="New Password" name="new_password1" />
                    <PasswordField required label="Confirm New Password" name="new_password2" />
                    <Box justify="end" gap="large" direction="row">
                        <CancelButton onClick={close} />
                        <SubmitButton label="Change Password" />
                    </Box>
                </Form>
            </Box>
        )
    }

    return (
        <Modal close={close}>
            {content}
        </Modal>
    )
}

export default ChangePassword;