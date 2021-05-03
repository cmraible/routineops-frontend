import { Box, Button, Grid, Text } from 'grommet';
import { Previous } from 'grommet-icons';
import React from 'react';

const MobileHeader = ({ action, previous, title, header}) => {

    return (
        <>
        <Box
            style={{position: "fixed", top: 0, zIndex: 10}}
            height="45px"
            pad={{horizontal: "small"}}
            width="100%"
            direction="row"
            background="black"
        >
            <Grid
                fill
                rows={['100%']}
                columns={['1/4', '1/2', '1/4']}
                areas={[['previous', 'title', 'action']]}
            >
            {(previous &&
                <Box gridArea="previous" justify="center" align="start">
                    <Box
                        pad="small"
                        onClick={previous}
                        data-cy="previous"
                    >
                        <Previous />
                    </Box>
                </Box>
            )}
            <Box gridArea="title" align="center" justify="center">
                {!header && (
                    <Text weight="bold" style={{whiteSpace: 'nowrap'}} margin="none" size="xlarge" textAlign="center">
                        {title}
                    </Text>
                )}
                {header && (header)}

            </Box>
            {(action &&
                <Box gridArea="action" align="end" justify="center">
                    <Button {...action} label={undefined} data-cy="action" />
                </Box>
            )}
            </Grid>
        </Box>
        <Box height="45px" />
    </>
    )
}

export default MobileHeader;