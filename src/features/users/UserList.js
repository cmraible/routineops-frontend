import { Box, Text } from 'grommet';
import { Add, User } from 'grommet-icons';
import React from 'react';
import { useSelector } from 'react-redux';
import ListView from '../../components/ListView';
import history from '../../history';
import { fetchUsers, selectAllUsers, selectUserById } from './usersSlice';

const UserExcerpt = ({id}) => {
  const user = useSelector(state => selectUserById(state, id));
  return (
    <Box direction="row" justify="between" onClick={() => history.push(`/users/${id}`)} pad="small">
      <Box direction="row" align="center" gap="medium">
        <User /><Text>{user.first_name} {user.last_name}</Text>
      </Box>
    </Box>
  )
}

const UserList = () => {

  return (
    <ListView
      title="Users"
      previous="/team"
      action={{
        icon: <Add />,
        onClick: () => history.push('/users/invite'),
        label: "Add User"
      }}
      itemSelector={selectAllUsers}
      fetchAction={fetchUsers}
      renderItem={(user) => (<UserExcerpt id={user.id} key={user.id} />)}
    />
  )
};

export default UserList;
