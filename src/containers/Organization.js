import { Anchor, Box, Sidebar } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrg, saveOrg } from '../actions/organization.actions';
import Page from '../components/Page';
import { Switch, Link, Route } from 'react-router-dom';
import OrgCalendarSettings from './OrgCalendarSettings';
import OrgContactInfo from './OrgContactInfo';

const Organization = ({ onSave, getOrg, organization, isFetching, errors }) => {

  useEffect(() => {
    getOrg(organization.id)
  }, [getOrg, organization.id]);

  return (
    <Page title="Organization">
      <Box direction="row-responsive" fill="horizontal">
        <Sidebar pad="medium" border="right" width="small">
          <Box gap="medium">
            <Anchor as={Link} to="/organization">Contact Info</Anchor>
            <Anchor as={Link} to="/organization/calendar">Calendar</Anchor>
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

export default connect(mapStateToProps, {onSave: saveOrg, getOrg: getOrg })(Organization);
