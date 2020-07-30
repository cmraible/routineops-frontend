import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OnboardUser from './OnboardUser';
import OnboardOrg from './OnboardOrg';

const Onboarding = ({ organization, user, isFetching }) => {
  if (!user.onboard_complete) {
    return <OnboardUser />
  } else if (!organization.onboard_complete) {
    return <OnboardOrg />
  } else {
    return <Redirect to="/" />
  }
  
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.user.user,
  organization: state.organization.organization
});

export default connect(mapStateToProps, {  })(Onboarding);