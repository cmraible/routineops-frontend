import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { saveOrg } from '../actions/actions';
import { connect } from 'react-redux';

const Organization = ({ saveOrg, organization }) => {

  const [ value, setValue] = useState({
    id: organization.id,
    name: (organization.name) ? organization.name : '',
    address1: (organization.address1) ? organization.address1 : '',
    address2: (organization.address2) ? organization.address2 : '',
    city: (organization.city) ? organization.city : '',
    state: (organization.state) ? organization.state : '',
    zip: (organization.zip) ? organization.zip : ''
  });

  return (
    <Main pad="medium">
      <Heading level={1}>Organization</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form
        onSubmit={({value, touch}) => {
          saveOrg(value)
        }}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
        <FormField label="Organization Name">
          <TextInput name="name" />
        </FormField>
        <FormField label="Address 1">
          <TextInput name="address1"/>
        </FormField>
        <FormField label="Address 2">
          <TextInput name="address2"/>
        </FormField>
        <Box direction="row">
          <FormField label="City">
            <TextInput name="city"/>
          </FormField>
          <FormField label="State">
            <TextInput name="state"/>
          </FormField>
          <FormField label="Zip">
            <TextInput name="zip"/>
          </FormField>
        </Box>
        <Button label="Save" primary size="large" type="submit" pad="small" />
      </Form>
    </Main>
  )

};

const mapStateToProps = state => {
  return {
    organization: state.organization
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveOrg: (organization) => {
      dispatch(saveOrg(organization))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
