import { Box, Text } from 'grommet';
import { Add, User } from 'grommet-icons';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListView from '../../components/ListView';
import { fetchUsers, selectAllUsers, selectUserById } from './usersSlice';
import { push } from 'connected-react-router';

const UserExcerpt = ({id}) => {
  const user = useSelector(state => selectUserById(state, id));
  const dispatch = useDispatch();
  return (
    <Box direction="row" justify="between" onClick={() => dispatch(push(`/users/${id}`))} pad="small">
      <Box direction="row" align="center" gap="medium">
        <User /><Text>{user.first_name} {user.last_name}</Text>
      </Box>
    </Box>
  )
}

const UserList = () => {

  const dispatch = useDispatch();

  return (
    <ListView
      title="Users"
      previous="/team"
      action={{
        icon: <Add />,
        onClick: () => dispatch(push('/users/invite')),
        label: "Add User"
      }}
      itemSelector={selectAllUsers}
      fetchAction={fetchUsers}
      renderItem={(user) => (<UserExcerpt id={user.id} key={user.id} />)}
    />
  )
};

export default UserList;
