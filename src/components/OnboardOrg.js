import { Box, Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import { LinkNext } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { verifyEmail } from '../actions/auth.actions';
import { goToOnboardSubscription } from '../actions/ui.actions';
import { saveOrg } from '../actions/organization.actions';

import Spinner from './Spinner';


const OnboardOrg = ({ goToOnboardSubscription, isFetching, user, saveOrg, organization }) => {

  const [value, setValue] = useState(organization);

  const success = (organization.name && organization.size);
  
  const handleSubmit = ({value}) => {
    console.log(value);
    saveOrg(value);
  }

  if (success) {
    goToOnboardSubscription()
  }

  return (
    <Main align="center" justify="start">
      <Box align="stretch" width="large" margin={{vertical: "large"}}>
        <Heading>Operationally</Heading>
        <Heading level={3}>Tell us about your Organization.</Heading>
        <Spinner isFetching={isFetching} />
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
          <Button align="end" type="submit" label="Next" size="large" icon={<LinkNext />} reverse primary />
        </Form>
      </Box>
    </Main>
  )
}

const mapStateToProps = state => ({
  isFetching: state.auth.isFetching,
  user: state.user.user,
  organization: state.organization.organization
});

export default connect(mapStateToProps, { saveOrg, goToOnboardSubscription })(OnboardOrg);
