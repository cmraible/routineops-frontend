import { Avatar, Box, Text, Tip } from 'grommet';
import { User } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserById } from './usersSlice';
import { push } from 'connected-react-router';


var seedrandom = require('seedrandom');
const colors = [
    '#EF5350',
    '#EC407A',
    '#AB47BC',
    '#5C6BC0',
    '#42A5F5',
    '#26C6DA',
    '#26A69A',
    '#9CCC65',
    '#FFCA28',
    '#FF7043'
]

const UserAvatar = ({ id, user, size, tip, link }) => {

    const dispatch = useDispatch();

    const userById = useSelector(state => selectUserById(state, id))

    const selectedUser = user ? user : userById;
    var rng = seedrandom(id);

    const [colorNum, setColorNum] = useState();
    useEffect(() => {
        setColorNum(Math.round(rng()*10,0))
    }, [selectedUser, rng]);

    
    const background = colors[colorNum];
    const color = 'white';
    let body;
    if (selectedUser) {
        body = (selectedUser.first_name && selectedUser.last_name) ? `${selectedUser.first_name[0].toUpperCase()}${selectedUser.last_name[0].toUpperCase()}` : <User color={color} />
    }

    let content;
    if (tip) {
        content = (
        <Tip content={tip ? <Text>{selectedUser.first_name} {selectedUser.last_name}</Text> : ''}>
            <Box style={{cursor: 'default'}} onClick={link ? () => dispatch(push(`/users/${id}`)) : null}>
                <Avatar border background={background} size={size || '36px'}>
                    {body}
                </Avatar>
            </Box>
        </Tip>
        )
    } else {
        content = (
            <Box style={{cursor: 'default'}} onClick={link ? () => dispatch(push(`/users/${id}`)) : null}>
                <Avatar background={background} size={size || '36px'}>
                    {body}
                </Avatar>
            </Box>
        )
    }

    return (
        content
    )
}

export default UserAvatar;