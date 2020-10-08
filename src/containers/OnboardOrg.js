import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { goToHome } from '../actions/ui.actions';
import { saveOrg } from '../actions/organization.actions';

import Spinner from '../components/Spinner';
import { getLoggedInUser } from '../reducers/reducers';

const OnboardOrg = ({ goToOnboardSubscription, isFetching, user, saveOrg, organization, goToHome }) => {

  useEffect(() => {
    document.title = 'Onboard Organization';
    window.analytics.page(document.title);
  }, []);

  const [value, setValue] = useState({
    id: organization.id,
    name: (organization.name) ? organization.name : '',
  });

  const handleSubmit = ({value}) => {
    saveOrg(value);
    goToHome()
  }

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} />
      </Box>
        <Box width="large" flex={false}>
          <Heading level={3}>Tell us about your Organization.</Heading>
          <Form
            value={value}
            onChange={ nextValue => setValue(nextValue)}
            onSubmit={handleSubmit}
          >
            <FormField label="Organization Name" name="name">
              <TextInput name="name" />
            </FormField>
            <Button fill="horizontal" align="center" type="submit" label="Continue" size="large" icon={<LinkNext />} reverse primary />
          </Form>
        </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: getLoggedInUser(state),
  organization: state.organization.organization
});

export default connect(mapStateToProps, { saveOrg, goToHome })(OnboardOrg);
