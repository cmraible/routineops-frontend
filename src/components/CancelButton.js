import React from 'react';
import { Box, Text } from 'grommet';


const CancelButton = ({label, onClick}) => {

    return (
        <Box round="small" pad="small" hoverIndicator onClick={onClick}>
            <Text>{label || "Cancel"}</Text>
        </Box>
    )
}

export default CancelButton;