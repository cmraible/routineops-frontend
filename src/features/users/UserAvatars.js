import { Box } from 'grommet';
import React from 'react';
import UserAvatar from './UserAvatar';

const UserAvatars = ({ ids, size, tip, link }) => {

    return (
        <Box direction="row" align="end" style={{position: 'relative', left: ids.length*15-15}}>
            {
                ids.map((id, index) => {
                    if (index < 3) {
                        return (
                            <Box style={{position: 'relative', right: index*15,}}>
                                <UserAvatar id={id} size={size} tip link />
                            </Box>
                        )
                    } else {
                        return null;
                    }
                    
                })
            }
        </Box>            
    )
}

export default UserAvatars;