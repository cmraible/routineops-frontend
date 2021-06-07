import { Box } from 'grommet';
import React from 'react';
import Tab from './Tab';


const DefaultTabs = ({ tabs }) => {

    return (
        <Box
            border={{"side": "bottom", "size": "xsmall", "color": "border"}}
            background="background-contrast"
            overflow={{"horizontal": "auto"}}
            direction="row"
            gap="large"
            pad={{horizontal: "small", top: "xsmall"}}
            data-cy="account-tabs"
        >
            {(tabs.map((tab) => (
                    <Tab key={tab.title} {...tab} />
            )))}
        </Box>

    )
}

export default DefaultTabs;