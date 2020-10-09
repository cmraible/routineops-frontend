import { Button, Box } from 'grommet';
import { User } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { goToProfile } from '../actions/ui.actions';
import { getLoggedInUser } from '../reducers/reducers';


const UserMenu = ({ goToProfile, user, afterClick, showLabel }) => {


  const handleClick = () => {
    goToProfile();
    if (afterClick) {
      afterClick();
    }
  }

  return (
    <Box onClick={handleClick} hoverIndicator>
      <Button round="full" plain icon={<User />} label={showLabel ? user.first_name + ' ' + user.last_name : ''} />
    </Box>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  isFetching: state.user.isFetching
});

export default connect(mapStateToProps, { goToProfile })(UserMenu);
