import { Box, Button, Heading, List } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import { selectLoggedInUser } from '../auth/authSlice';
import InvitationItem from '../invitations/InvitationItem';
import { fetchInvitations, selectIncompleteInvitations } from '../invitations/invitationsSlice';
import UserAdd from '../users/UserAdd';
import UserItem from '../users/UserItem';
import { fetchUsers, selectActiveUsers, selectInActiveUsers } from '../users/usersSlice';


const UserList = () => {

    const activeUsers = useSelector(selectActiveUsers);
    const inactiveUsers = useSelector(selectInActiveUsers);
    const loggedInUser = useSelector(selectLoggedInUser)
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
      content = (<Spinner />)
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
              data={activeUsers}
              pad="none"
              children={(datum, index) => {
                return  (<UserItem id={datum.id} />)
              }}
            />
          </Box>
          {loggedInUser.is_account_admin && invitations.length > 0 && (
            <Box gap="small">
              <Heading margin={{vertical: "none", horizontal: "small"}} level={2} size="small">Invited Users</Heading>
              <List
                pad="none"
                data={invitations}
                children={(datum, index) => <InvitationItem invitation={datum} />}
              />
            </Box>
          )}
          {loggedInUser.is_account_admin && inactiveUsers.length > 0 && (
            <Box gap="small">
              <Heading margin={{vertical: "none", horizontal: "small"}} level={2} size="small">Inactive Users</Heading>
              <List
                pad="none"
                data={inactiveUsers}
                children={(datum, index) => <UserItem id={datum.id} />}
              />
            </Box>
          )}

          
        </Box>
          
        </>
      )
    }

    return (
        <Box fill>
          {loggedInUser.is_account_admin === true && (
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
          )}
          {content}
          {(add && <UserAdd close={() => setAdd(false)} />)}
      </Box>
    )
}

export default UserList;