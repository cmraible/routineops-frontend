import { Form } from 'grommet';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import InlineInput from '../../components/InlineInput';
import { addNewRole } from './rolesSlice';
import { selectLoggedInUser } from '../auth/authSlice';

const RoleFormAdd = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)

    const [requestStatus, setRequestStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState({
        name: '',
        account: user.account
    })
    const handleSubmit = async ({value}) => {
        setRequestStatus('pending');
        setErrors({});
        const resultAction = await dispatch(addNewRole(value))
        if (addNewRole.fulfilled.match(resultAction)) {
            setRequestStatus('succeeded');
            setValue({
                name: '',
                account: user.account
            });
        } else {
            setRequestStatus('failed');
            setErrors({'non_field_errors': `Unable to add role: ${resultAction.error.message}`});
        }

    }

    return (
        <React.Fragment>
            <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined } />
            <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onSubmit={handleSubmit}
                errors={errors}
            >
                <InlineInput
                    placeholder="Type here to add a role"
                    name="name"
                    isFetching={requestStatus === 'pending'}
                    required
                />
            </Form>
        </React.Fragment>

    )
}

export default RoleFormAdd;