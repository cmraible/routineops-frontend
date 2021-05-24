import React from 'react'
import { Box, Text } from 'grommet'

const Description = ({title, description, size}) => {

    return (
        <Box
            align="center"
            direction="row"
            justify="between"
            pad="small"
        >
            <Text size={size || "medium"} weight="bold">{title}</Text>
            <Text margin={{horizontal: "small"}} size={size || "medium"}>{description}</Text>
        </Box>
    )
}

export default Description;