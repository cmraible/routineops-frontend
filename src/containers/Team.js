import { Box, Heading, Text } from 'grommet';
import { Next } from 'grommet-icons';
import React from 'react';
import Page from '../components/Page';
import history from '../history';

const Team = () => {

  return (
    <Page title="Team">
      <Box gap="large" pad="small">
        <Box direction="row" justify="between" align="center" round={true} border={true} pad="medium" size="medium" onClick={() => history.push('/users/invite')}>
          <Box>
            <Heading margin="none" level={2}>Invite User</Heading>
            <Text size="small" color="text-xweak">Send an invite to anyone by email address.</Text>
          </Box>
          <Next />
        </Box>
        <Box direction="row" justify="between" align="center" round={true} border={true} pad="medium" size="medium" onClick={() => history.push('/users')}>
          <Box>
            <Heading margin="none" level={2}>Manage Users</Heading>
            <Text size="small" color="text-xweak">View users and change roles.</Text>
          </Box>
          <Next />
        </Box>
        <Box direction="row" justify="between" align="center" round={true} border={true} pad="medium" size="medium" onClick={() => history.push('/roles')}>
          <Box>
            <Heading margin="none" level={2}>Manage Roles</Heading>
            <Text size="small" color="text-xweak">Add and view roles.</Text>
          </Box>
          <Next />
        </Box>
      </Box>
    </Page>

  )
}

export default Team;