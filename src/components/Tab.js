import React from 'react';
import { Box, Text } from 'grommet'
import { ThemeContext } from 'styled-components';
import history from '../history';


const DefaultTab = ({icon, title, href, active}) => {

    return (
        <ThemeContext.Extend
            value={{ global: { colors: { icon: active ? "selected" : "text"}}}}
        >
            <Box
                direction="row"
                align="center"
                gap="small"
                round={{corner: "top", size: "small"}}
                flex={false}
                style={{whiteSpace: 'nowrap'}}
                border={(active) ? {side: "bottom", "size": "medium", "color": "selected"} : {side: "bottom", "size": "medium", "color": "rgb(0,0,0,0)"}}
                pad={{
                    horizontal: "medium",
                    vertical: "small"
                }}
                hoverIndicator={true}
                onClick={() => history.push(href)}
            >

                    {icon}
                    <Text color={active ? "selected" : "text"}>{title}</Text>
            </Box>
        </ThemeContext.Extend>
    )
}

export default DefaultTab;