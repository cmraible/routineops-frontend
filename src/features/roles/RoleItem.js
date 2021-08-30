import { push } from 'connected-react-router';
import { Box, Menu, Text } from 'grommet';
import { FormEdit, FormTrash, More, User } from 'grommet-icons';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRolesForRole } from '../userRoles/userRolesSlice';
import RoleDelete from './RoleDelete';
import UserAvatars from '../users/UserAvatars';
import { selectRoleById } from './rolesSlice';

const RoleItem = ({id}) => {
    const dispatch = useDispatch();
    const role = useSelector(state => selectRoleById(state, id));
    const userRoles = useSelector(state => selectUserRolesForRole(state, id))
    const [showDelete, setShowDelete] = useState(false);

    return (
        <Box
            direction="row"
            fill
            pad={{horizontal: "small"}}
        >
            <Box
                pad="small"
                direction="row"
                align="center"
                gap="medium"
                fill
                onClick={() => dispatch(push(`/roles/${id}`))}
            >
                <User />
                <Box>
                    <Text style={{ lineHeight: '18px' }}>{role.name}</Text>
                    <Text style={{ lineHeight: '10px' }} size="xsmall" color="text-xweak">Created {DateTime.fromISO(role.created).toLocaleString()}</Text>
                </Box>
            </Box>
            <Box align="center" justify="center">
                <UserAvatars ids={userRoles.map(userRole => userRole.user)} size="small" tip />
            </Box>
            <Menu
                size="small"
                data-cy={`action-menu-${id}`}
                icon={<More />}
                dropAlign={{"right": "right", "top": "bottom"}}
                alignSelf="end"
                items={[
                    {label: "Edit", icon: <FormEdit />, gap: "small", onClick: () => dispatch(push(`/roles/${id}/edit`))},
                    {label: "Delete", icon: <FormTrash />, gap: "small", size: "small", onClick: () => setShowDelete(true)}
                ]}
            />
            {(showDelete && <RoleDelete id={id} close={() => setShowDelete(false)} />)}

        </Box>
    )
}

export default RoleItem;