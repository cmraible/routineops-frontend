import { Box, Button,  Heading, Meter, Text } from 'grommet';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { goToOrgUpgradeSubscription } from '../actions/ui.actions';
import { getAllUsers } from '../reducers/reducers';
import { getUsers } from '../actions/user.actions';
import { getOrg } from '../actions/organization.actions';

const OrgStarterSubscription = ({ isFetching, darkMode, organization, users, getUsers, getOrg }) => {

  useEffect(() => {
    getOrg();
    getUsers();
  }, [getUsers, getOrg]);

  const subQuantity = 3;
  const meterColor = (users.length === 3) ? "status-critical" : "status-warning"

  return (
    <Box flex={false} gap="small">
      <Heading margin="none" level={2}>Subscription</Heading>
      <Box direction="row" align="center" justify="between">
        <Text>Current Plan:</Text>
        <Text>Starter @ $0 / user / month</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>User Limit:</Text>
        <Box direction="row" align="center" gap="small">
          <Text weight="bold">{users.length} / {subQuantity}</Text>
          <Meter type="bar" max={subQuantity} round={true} size="small" background="light-4" values={[{"value": users.length, "color": meterColor}]}  />
      </Box>
      </Box>
     
      <Button label="Upgrade" primary onClick={goToOrgUpgradeSubscription} />
      
    </Box>
      
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  users: getAllUsers(state),
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, { 
  goToOrgUpgradeSubscription,
  getUsers,
  getOrg
})(OrgStarterSubscription);
