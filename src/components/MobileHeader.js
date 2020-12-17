import React from 'react';
import { Box, Button, Grid, Text } from 'grommet';
import { LinkPrevious } from 'grommet-icons';
import history from '../history';


const MobileHeader = ({ action, previous, title}) => {


    return (
        <>
        <Box
            style={{position: "absolute", top: 0}}
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
                        onClick={() => history.push(previous)}
                        data-cy="previous"
                    >
                        <LinkPrevious />
                    </Box>
                </Box>
            )}
            <Box gridArea="title" align="center" justify="center">
                <Text weight="bold" style={{whiteSpace: 'nowrap'}} margin="none" size="xlarge" textAlign="center">
                    {title}
                </Text>
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