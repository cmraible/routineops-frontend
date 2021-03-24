import React from 'react';
import { Box, Text } from 'grommet';
import { StatusGood, StatusInfo, StatusCritical } from 'grommet-icons'

const Message = ({type, message, ...rest}) => {

    let icon;
    let background;
    switch (type) {
        case "success":
            icon = <StatusGood color="status-ok" />
            background="status-ok"
            break;
        case "error":
            icon = <StatusCritical color="status-critical" />
            background="status-critical"
            break;
        default:
            icon = <StatusInfo color="selected" />
            background="selected"
            break;
    }


    return (
        <Box
            direction="row"
            gap="large"
            align="center"
            pad="medium"
            round="small"
            background={{color: background, opacity: "weak"}}
            fill="horizontal"
            {...rest}
            data-cy={`${type}-message`}
        >
            {icon}
            <Text size="large">{message}</Text>
        </Box>
    )
}

export default Message;