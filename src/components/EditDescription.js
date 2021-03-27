import React from 'react';
import { FormEdit, FormAdd, StatusCritical, StatusGood } from 'grommet-icons';
import { Box, Text } from 'grommet';

const EditDescription = ({title, dataCY, description, onClick, size, verifiable, verified}) => {

    let icon
    if (verifiable) {
        icon = verified ? <StatusGood color="status-ok" /> : <StatusCritical color="status-critical" />
    } else {
        icon = ''
    }

    const editIcon = description ? <FormEdit /> : <FormAdd />;

    return (
        <Box
            align="center"
            direction="row"
            justify="between"
            pad="medium"
        >
            <Text size={size || "medium"} weight="bold">{title}</Text>
            <Box direction="row" align="center" justify="end" gap="medium">
                {icon}
                <Box
                    align="center"
                    justify="between"
                    pad="small"
                    hoverIndicator
                    round="small"
                    direction="row"
                    gap="medium"
                    onClick={onClick}
                    data-cy={dataCY}
                >
                    {editIcon}
                    {description}
                </Box>
            </Box>

        </Box>
    )
}

export default EditDescription;