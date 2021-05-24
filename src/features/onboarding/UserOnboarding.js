import { Box, Form, FormField, Select, TextInput } from 'grommet';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountPage from '../../components/AccountPage';
import Message from '../../components/Message';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors, timezones } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import { updateUser } from '../users/usersSlice';

const UserOnboarding = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const [tzOptions, setTzOptions] = useState(timezones);
    const [status, setStatus] = useState('idle');
    const [errors, setErrors] = useState();
    const [value, setValue] = useState({
        id: user.id,
        timezone: timezones.includes(Intl.DateTimeFormat().resolvedOptions().timeZone) ? Intl.DateTimeFormat().resolvedOptions().timeZone : null,
        send_morning_summary: '06:00:00',
        send_evening_summary: '18:00:00',
        onboard_complete: DateTime.local().toISO()
    });

    const handleSubmit = async () => {
        setStatus('pending');
        const resultAction = await dispatch(updateUser(value))
        if (updateUser.fulfilled.match(resultAction)) {
            // Great success
            setStatus('success');
        } else {
            // Error
            setStatus('failed');
            if (resultAction.payload) {
                setErrors(flattenErrors(resultAction.payload));
            } else {
                setErrors({'non_field_errors': resultAction.error.message});
            }
        }
    }

    return (
        <AccountPage title="User Onboarding">
            <Box gap="medium">
                <Form 
                    value={value}
                    onSubmit={handleSubmit}
                    onChange={nextValue => setValue(nextValue)}
                    errors={errors}
                >
                    {(errors && errors['non_field_errors'] && <Message
                    type="error"
                    message={errors['non_field_errors']}
                    />)}
                    <FormField name="timezone" label="Timezone">
                        <Select 
                            name='timezone'
                            options={tzOptions}
                            onSearch={(text) => {
                                // Escape regex special characters
                                const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
                                
                                const exp = new RegExp(escapedText, 'i');
                                setTzOptions(timezones.filter(o => exp.test(o)));
                            }}
                        />
                    </FormField>
                    <FormField name="send_morning_summary" label="Morning Summary">
                        <TextInput type="time" name="send_morning_summary" />
                    </FormField>
                    <FormField name="send_evening_summary" label="Evening Summary">
                        <TextInput type="time" name="send_evening_summary" />
                    </FormField>
                    <SubmitButton label="Confirm" fill="horizontal" loadingIndicator={status === 'pending'} />
                </Form>
            </Box>
        </AccountPage>
    )
}

export default UserOnboarding;