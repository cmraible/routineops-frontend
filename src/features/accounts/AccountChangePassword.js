import { Box, Form, Text } from 'grommet';
import { StatusGood } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelButton from '../../components/CancelButton';
import Error from '../../components/Error';
import Modal from '../../components/Modal';
import PasswordField from '../../components/PasswordField';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { changePassword } from '../auth/authSlice';
import { selectLoggedInUser } from '../auth/authSlice';
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
            setTimeout(() => close(), 1500)
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
                <Box direction="row" gap="medium" round="small" pad="medium" background={{color: "status-ok", opacity: "weak"}}>
                    <StatusGood color="status-ok" /><Text>New password has been saved.</Text>
                </Box>
            </Box>
        )
    } else {
        content = (
            <Box gap="medium">
                <Form
                    errors={errors}
                    onSubmit={handleSubmit}
                    data-cy="change-password-form"
                >
                    <Box pad="small" gap="medium">
                        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
                        <PasswordField required label="New Password" name="new_password1" />
                        <PasswordField required label="Confirm New Password" name="new_password2" />
                    </Box>
                    <Box
                        justify="end"
                        gap="large"
                        direction="row"
                        background="background-contrast"
                        pad="small"
                    >
                        <CancelButton onClick={close} />
                        <SubmitButton label="Change Password" />
                    </Box>
                </Form>
            </Box>
        )
    }

    return (
        <Modal title="Change Password" close={close}>
            {content}
        </Modal>
    )
}

export default ChangePassword;