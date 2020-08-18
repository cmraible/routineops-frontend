import { Anchor, Box, Sidebar } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrg, saveOrg } from '../actions/organization.actions';
import { getUsers } from '../actions/user.actions';
import { goToOrg, goToOrgCalendar, goToOrgSubscription } from '../actions/ui.actions';
import Page from '../components/Page';
import { Switch, Route } from 'react-router-dom';
import OrgCalendarSettings from './OrgCalendarSettings';
import OrgContactInfo from './OrgContactInfo';
import OrgSubscription from './OrgSubscription';

const Organization = ({ getOrg, goToOrg, goToOrgCalendar, goToOrgSubscription, organization }) => {

  useEffect(() => {
    getOrg(organization.id);
    getUsers();
  }, [getOrg, organization.id]);

  return (
    <Page title="Organization">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Anchor color="text" to="/organization" onClick={goToOrg} >Contact</Anchor>
            <Anchor color="text" to="/organization/calendar" onClick={goToOrgCalendar} >Calendar</Anchor>
            <Anchor color="text" to="/organization/subscription" onClick={goToOrgSubscription} >Subscription</Anchor>
          </Box>
        </Sidebar>
        <Box width="large" pad="medium">
          <Switch>
            <Route exact path="/organization" component={OrgContactInfo} />
            <Route path="/organization/calendar" component={OrgCalendarSettings} />
            <Route path="/organization/subscription" component={OrgSubscription} />
          </Switch>
        </Box>
      </Box>
    </Page>
  )
};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  errors: state.organization.errors
});

export default connect(mapStateToProps, { 
  saveOrg, 
  getOrg, 
  goToOrg, 
  goToOrgCalendar, 
  goToOrgSubscription,
  getUsers,
})(Organization);
