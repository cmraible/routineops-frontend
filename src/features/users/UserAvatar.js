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

const UserAvatar = ({ id, size, tip, link }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => selectUserById(state, id))
    var rng = seedrandom(id);

    const [colorNum, setColorNum] = useState();
    useEffect(() => {
        setColorNum(Math.round(rng()*10,0))
    }, [user, rng]);

    
    const background = colors[colorNum];
    const color = 'white';
    let body;
    if (user) {
        body = (user.first_name && user.last_name) ? `${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}` : <User color={color} />
    }

    let content;
    if (tip) {
        content = (
        <Tip content={tip ? <Text>{user.first_name} {user.last_name}</Text> : ''}>
            <Box style={{cursor: 'default'}} onClick={link ? () => dispatch(push(`/users/${id}`)) : ''}>
                <Avatar background={background} size={size || '36px'}>
                    {body}
                </Avatar>
            </Box>
        </Tip>
        )
    } else {
        content = (
            <Box style={{cursor: 'default'}} onClick={link ? () => dispatch(push(`/users/${id}`)) : ''}>
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