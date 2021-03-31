import React from 'react';
import { Sidebar, Nav } from 'grommet';
import UserMenu from '../features/users/UserMenu';
import DesktopSidebarItem from '../components/DesktopSidebarItem';



const DesktopSidebar = ({children, links}) => {

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
                {
                    links.map((link) => {
                        return (
                            <DesktopSidebarItem key={link.label} {...link} />
                        )
                    })
                }
            </Nav>
        </Sidebar>
    )
}

export default DesktopSidebar