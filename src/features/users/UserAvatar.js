import React, { useEffect, useState} from 'react';
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

const UserAvatar = ({ user, size }) => {

    var rng = seedrandom(user.email);

    const [colorNum, setColorNum] = useState();
    useEffect(() => {
        setColorNum(Math.round(rng()*10,0))
    }, [user.email, rng]);

    
    const background = colors[colorNum];
    const color = 'white';
    const body = (user.first_name && user.last_name) ? `${user.first_name[0]}${user.last_name[0]}` : <User color={color} />;


    return (
        <Avatar background={background} size={size || '36px'}>
            {body}
        </Avatar>
    )
}

export default UserAvatar;