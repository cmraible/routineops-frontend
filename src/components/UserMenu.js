import { Avatar, Box, Text } from 'grommet';
import { User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { goToProfile } from '../actions/ui.actions';


const UserMenu = ({ goToProfile, user }) => {

  return (
    <Box margin={{bottom: "large"}} onClick={() => goToProfile()}>
        <Box align="center" direction="row" gap="small">
          <Avatar background="white" round="full" size="medium">
              <User color="brand" size="medium" />
          </Avatar>
          <Box direction="column">
            <Text>{user.first_name + ' ' + user.last_name}</Text>
          </Box>
          
        </Box>
    </Box>
  )
};

const mapStateToProps = state => ({
  user: state.user.user,
  isFetching: state.user.isFetching
});

export default connect(mapStateToProps, { goToProfile })(UserMenu);
