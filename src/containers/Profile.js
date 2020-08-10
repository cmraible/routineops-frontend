import { Box, Sidebar } from 'grommet';
import React from 'react';
import { connect } from 'react-redux';
import { toggleDarkMode } from '../actions/ui.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import Page from '../components/Page';
import { Route, Switch, Link } from 'react-router-dom';
import ProfileContactInfo from './ProfileContactInfo';
import ProfileUI from './ProfileUI';


const Profile = () => {

  return (
    <Page title="Profile">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Link to="/profile/">Contact Info</Link>
            <Link to="/profile/ui">User Interface</Link>
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

export default connect(mapStateToProps, { toggleDarkMode })(Profile);
