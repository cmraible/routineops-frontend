import { push } from 'connected-react-router';
import { Box, Menu, Text } from 'grommet';
import { FormEdit, FormTrash, More, User } from 'grommet-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleDelete from './RoleDelete';
import { selectRoleById } from './rolesSlice';

const RoleItem = ({id}) => {
    const dispatch = useDispatch();
    const role = useSelector(state => selectRoleById(state, id));

    const [showDelete, setShowDelete] = useState(false);

    return (
        <Box
            direction="row"
            fill
            pad={{horizontal: "small"}}
            border="bottom"
            hoverIndicator
        >
            <Box
                pad="small"
                direction="row"
                align="center"
                gap="medium"
                fill
                onClick={() => dispatch(push(`/roles/${id}`))}
            >
                <User /><Text>{role.name}</Text>
            </Box>
            <Menu
                size="small"
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