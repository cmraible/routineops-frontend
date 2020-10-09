import { Anchor, Box, Button, Sidebar } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { goBack, goToProfile, goToProfileUI, toggleDarkMode } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';
import { Route, Switch } from 'react-router-dom';
import { Previous } from 'grommet-icons';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileUI from './ProfileUI';


const Profile = ({goToProfile, goToProfileUI, goBack}) => {

  const secondary_action = (<Button plain icon={<Previous />} onClick={goBack} />)

  return (
    <Page title="Profile" secondary_action={secondary_action}>
      <Box fill="horizontal" pad="medium" gap="xlarge">
        <ProfileContactInfo />
        <ProfileUI />
      </Box>
    </Page>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  errors: state.user.errors,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, {
  toggleDarkMode,
  goBack,
  goToProfile,
  goToProfileUI
})(Profile);
