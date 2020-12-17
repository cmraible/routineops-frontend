import React from 'react';
import { Sidebar, Nav } from 'grommet';
import UserMenu from '../features/users/UserMenu';

const DesktopSidebar = ({children}) => {

    return (
        <Sidebar
            background="black"
            direction="column"
            width="300px"
            header={<UserMenu showLabel />}
            style={{whiteSpace: 'nowrap'}}
            gap="xlarge"
            data-cy="site-navigation"
        >
            <Nav gap="medium">
                {children}
            </Nav>
        </Sidebar>
    )
}

export default DesktopSidebar