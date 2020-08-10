import { Anchor, Box, Sidebar } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrg, saveOrg } from '../actions/organization.actions';
import { goToOrg, goToOrgCalendar } from '../actions/ui.actions';
import Page from '../components/Page';
import { Switch, Route } from 'react-router-dom';
import OrgCalendarSettings from './OrgCalendarSettings';
import OrgContactInfo from './OrgContactInfo';

const Organization = ({ getOrg, goToOrg, goToOrgCalendar, organization }) => {

  useEffect(() => {
    getOrg(organization.id)
  }, [getOrg, organization.id]);

  return (
    <Page title="Organization">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Anchor to="/organization" onClick={goToOrg} >Contact</Anchor>
            <Anchor to="/organization/calendar" onClick={goToOrgCalendar} >Calendar</Anchor>
          </Box>
        </Sidebar>
        <Box width="large" pad="medium">
          <Switch>
            <Route exact path="/organization" component={OrgContactInfo} />
            <Route path="/organization/calendar" component={OrgCalendarSettings} />
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

export default connect(mapStateToProps, { saveOrg, getOrg, goToOrg, goToOrgCalendar })(Organization);
