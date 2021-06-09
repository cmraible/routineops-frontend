import { Box, Button, Grid, Text } from 'grommet';
import { Previous } from 'grommet-icons';
import React from 'react';

const MobileHeader = ({ action, previous, title, header}) => {

    return (
        <Box
            style={{position: "sticky", top: 0, zIndex: 10}}
            height="45px"
            pad={{horizontal: "small"}}
            fill="horizontal"
            direction="row"
            background="black"
            flex={false}
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
                    <Button {...action} primary={false} label={undefined} data-cy="action" />
                </Box>
            )}
            </Grid>
        </Box>
        
    )
}

export default MobileHeader;