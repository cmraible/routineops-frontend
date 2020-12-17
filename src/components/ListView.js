import { Box, List } from 'grommet';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { flattenErrors } from '../utils';
import Error from './Error';
import Page from './Page';
import Spinner from './Spinner';

const ListView = ({ title, action, previous, itemSelector, fetchAction, renderItem, header, footer, listActions, empty }) => {
    const dispatch = useDispatch();
    const itemIds = useSelector(itemSelector);

    const [requestStatus, setRequestStatus] = useState('idle');
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const fetch = async () => {
            setRequestStatus('pending');
            setErrors({});
            const resultAction = await dispatch(fetchAction())
            if (fetchAction.fulfilled.match(resultAction)) {
                setRequestStatus('succeeded');
            } else {
                setRequestStatus('failed');
                if (resultAction.payload) {
                    setErrors(flattenErrors(resultAction.payload))
                } else {
                    setErrors({'non_field_errors': resultAction.error.message})
                }
            }
        }
        fetch();
    }, [dispatch, fetchAction]);

    let content

    if (requestStatus === 'pending') {
        content = (<Spinner pad="large" size="large" color="status-unknown" />)
    } else if (requestStatus === 'succeeded') {
        if (itemIds.length > 0) {
            content = (
                <List
                    data={itemIds}
                    children={renderItem}
                    action={listActions}
                />
            )
        } else {
            content = (empty)
        }

    } else if (requestStatus === 'failed') {
        content = (<Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />)
    }

    return (
        <Page
            title={title}
            action={action}
            previous={previous}
        >
            <Box gap="medium" pad="medium">
                {header}

                {content}

                {footer}
            </Box>

        </Page>
    )


}

export default ListView;