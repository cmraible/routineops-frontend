import React from 'react';
import { Box } from 'grommet';
import MobileFooterItem from './MobileFooterItem';


const MobileFooter = ({links}) => {
    const standalone = window.navigator.standalone
    const padding = standalone ? {bottom: "34px", top: "small"} : "small"
    return (
        <>
            <Box
                style={{position: 'fixed', bottom: 0, zIndex: 10}}
                width="100%"
                background="black"
                direction="row"
                justify="around"
                pad={padding}
                data-cy="site-navigation"
            >
                {

                    links.map((link) => {
                        return (
                            <MobileFooterItem key={link.label} {...link} />
                        )
                    })

                }
            </Box>

        </>
    )
}

export default MobileFooter