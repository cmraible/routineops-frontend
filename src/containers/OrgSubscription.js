import React from 'react';
import { connect } from 'react-redux';
import { goToSignup } from '../actions/ui.actions';
import OrgUpgradeSubscription from './OrgUpgradeSubscription';
import OrgChangeSubscription from './OrgChangeSubscription'; 
import OrgStarterSubscription from './OrgStarterSubscription';
import OrgSubscriptionDetail from './OrgSubscriptionDetail';
import { Switch, Route } from 'react-router-dom';

const OrgSubscription = ({ organization }) => {

  if (organization.subscription) {
    return (
      <Switch>
        <Route exact path="/organization/subscription" component={OrgSubscriptionDetail} />
        <Route exact path="/organization/subscription/change" component={OrgChangeSubscription} />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/organization/subscription" component={OrgStarterSubscription} />
        <Route exact path="/organization/subscription/change" component={OrgStarterSubscription} />
        <Route exact path="/organization/subscription/upgrade" component={OrgUpgradeSubscription} />
      </Switch>
    )
  }
};

const mapStateToProps = state => ({
  organization: state.organization.organization
});

export default connect(mapStateToProps, { 
  goToSignup,
})(OrgSubscription);
