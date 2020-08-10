import { Anchor, Box, Sidebar } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { goToProfile, goToProfileUI, toggleDarkMode } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';
import { Route, Switch } from 'react-router-dom';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileUI from './ProfileUI';

const Profile = ({goToProfile, goToProfileUI}) => {
  return (
    <Page title="Profile">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Anchor to="/profile/" onClick={goToProfile}>Contact Info</Anchor>
            <Anchor to="/profile/ui" onClick={goToProfileUI}>User Interface</Anchor>
          </Box>
        </Sidebar>
        <Box width="large" pad="medium">
          <Switch>
            <Route exact path="/profile" component={ProfileContactInfo} />
            <Route path="/profile/ui" component={ProfileUI} />
          </Switch>
        </Box>
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

export default connect(mapStateToProps, { toggleDarkMode, goToProfile, goToProfileUI })(Profile);
