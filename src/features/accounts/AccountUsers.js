import React, { useState, useEffect } from 'react';
import { Box, Button, List } from 'grommet';
import { Add } from 'grommet-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers, fetchUsers } from '../users/usersSlice';
import { flattenErrors } from '../../utils';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import UserItem from '../users/UserItem';
import { push } from 'connected-react-router';
import UserAdd from '../users/UserAdd';


const AccountUsers = () => {

    const users = useSelector(selectAllUsers)
    const dispatch = useDispatch()

    const [requestStatus, setRequestStatus] = useState('idle')
    const [errors, setErrors] = useState({})
    const [add, setAdd] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setRequestStatus('pending');
            setErrors({});
            const resultAction = await dispatch(fetchUsers())
            if (fetchUsers.fulfilled.match(resultAction)) {
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
        fetch()
    }, [dispatch])

    let content

    if (requestStatus === 'pending') {
      content = (<Spinner pad="large" size="large" color="status-unknown" />)
    } else if (requestStatus === 'failed') {
      content = (
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      )
    } else {
      content = (
        <List
          data={users}
          children={(datum, index) => <UserItem user={datum} />}
          onClickItem={(datum, index) => dispatch(push(`/users/${datum.item.id}`))}
        />
      )
    }

    return (
        <Box>
          <Box align="end" pad="medium">
            <Button
              fill={false}
              primary
              size="large"
              icon={<Add />}
              label="Invite a user"
              onClick={() => setAdd(true)}
            />
          </Box>
          {content}
          {(add && <UserAdd close={() => setAdd(false)} />)}
      </Box>
    )
}

export default AccountUsers;