import { push } from 'connected-react-router';
import { Add } from 'grommet-icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import ListView from '../../components/ListView';
import UserItem from './UserItem';
import { fetchUsers, selectAllUsers } from './usersSlice';

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
      renderItem={(user) => (<UserItem id={user.id} key={user.id} />)}
    />
  )
};

export default UserList;
