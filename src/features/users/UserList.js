import { push } from 'connected-react-router';
import { Box, Button, Heading, List } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import InvitationItem from '../invitations/InvitationItem';
import { fetchInvitations, selectIncompleteInvitations } from '../invitations/invitationsSlice';
import UserAdd from '../users/UserAdd';
import UserItem from '../users/UserItem';
import { fetchUsers, selectAllUsers } from '../users/usersSlice';


const UserList = () => {

    const users = useSelector(selectAllUsers);
    const invitations = useSelector(selectIncompleteInvitations);
    const dispatch = useDispatch();

    const [requestStatus, setRequestStatus] = useState('idle');
    const [errors, setErrors] = useState({});
    const [add, setAdd] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setRequestStatus('pending');
            setErrors({});
            const userAction = await dispatch(fetchUsers());
            const invitationAction = await dispatch(fetchInvitations());
            if (fetchUsers.fulfilled.match(userAction) && fetchInvitations.fulfilled.match(invitationAction)) {
              setRequestStatus('succeeded');
            } else {
              setRequestStatus('failed');
              if (userAction.payload) {
                setErrors(flattenErrors(userAction.payload))
              } else if (invitationAction.payload) {
                setErrors(flattenErrors(invitationAction.payload));
              } else {
                  setErrors({'non_field_errors': userAction.error.message})
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
        <>
        <Box gap="medium">
          <Box gap="small">
            <Heading margin={{vertical: "none", horizontal: "small"}} level={2} size="small">Active Users</Heading>
            <List
              data={users}
              children={(datum, index) => <UserItem user={datum} />}
              onClickItem={(datum, index) => dispatch(push(`/users/${datum.item.id}`))}
            />
          </Box>
          <Box gap="small">
            <Heading margin={{vertical: "none", horizontal: "small"}} level={2} size="small">Invited Users</Heading>
            <List
              data={invitations}
              children={(datum, index) => <InvitationItem invitation={datum} />}
            />
          </Box>
        </Box>
          
        </>
      )
    }

    return (
        <Box>
          <Box align="end" pad="medium">
            <Button
              fill={false}
              data-cy="action"
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

export default UserList;