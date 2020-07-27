import { Box, Button, Form, FormField, Heading, Image, Main, Select, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { goToHome } from '../actions/ui.actions';
import { saveOrg } from '../actions/organization.actions';
import { Mixpanel } from '../mixpanel';

import Spinner from './Spinner';

const OnboardOrg = ({ goToOnboardSubscription, isFetching, user, saveOrg, organization, goToHome }) => {

  useEffect(() => {
    Mixpanel.track('Viewed onboard organization page.');
  }, []);

  const [value, setValue] = useState({
    id: organization.id,
    name: organization.name,
    size: organization.size
  });
  
  const handleSubmit = ({value}) => {
    console.log(value);
    saveOrg(value);
    goToHome()
  }

  return (
    <Main pad="xlarge">
      <Box direction="row" align="center" gap="large">
        <Heading size="large">Welcome.</Heading>
        <Spinner isFetching={isFetching} />
      </Box>
      <Box direction="row-responsive" align="center" justify="start" fill="horizontal" gap="xlarge">
        <Box width="large">
          <Heading level={3}>Tell us about your Organization.</Heading>
          <Form
            value={value}
            onChange={ nextValue => setValue(nextValue)}
            onSubmit={handleSubmit}
          >
            <FormField label="Organization Name">
              <TextInput name="name" />
            </FormField>
            <FormField label="Organization Size">
              <Select 
                name="size"
                options={
                  [
                    '1 - 10 employees',
                    '10 - 50 employees', 
                    '50 - 500 employees', 
                    '500 - 2000 employees', 
                    '2000 - 10,000 employees', 
                    '10,000 + employees'
                ]}
              />
            </FormField>
            <Button fill align="center" type="submit" label="Continue" size="large" icon={<LinkNext />} reverse primary />
          </Form>
        </Box>
        <Box width="large">
          <Image src={process.env.PUBLIC_URL + "/undraw_factory_dy0a.svg"} />
        </Box>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.user.user,
  organization: state.organization.organization
});

export default connect(mapStateToProps, { saveOrg, goToHome })(OnboardOrg);
