import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { Avatar } from 'grommet';
import { User } from 'grommet-icons';

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

const UserAvatar = ({ id, size }) => {

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

    return (
        <Avatar background={background} size={size || '36px'}>
            {body}
        </Avatar>
    )
}

export default UserAvatar;