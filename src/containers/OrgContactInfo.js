import React, { useState } from 'react';
import { Box, Button, Form, Heading, FormField, TextInput,  } from 'grommet'
import { connect } from 'react-redux';
import { saveOrg } from '../actions/organization.actions';

const CalendarSettings = ( { organization, isFetching, saveOrg } ) => {

    const [ value, setValue] = useState({
      id: organization.id,
      name: (organization.name) ? organization.name : '',
      address1: (organization.address1) ? organization.address1 : '',
      address2: (organization.address2) ? organization.address2 : '',
      city: (organization.city) ? organization.city : '',
      state: (organization.state) ? organization.state : '',
      zip: (organization.zip) ? organization.zip : '',
    });

    const handleSubmit = ({value}) => {
      saveOrg(value)
    }

    return (
    <Box flex={false}>
      <Heading margin="none" level={2}>Contact Info</Heading>
          <Form
            onSubmit={handleSubmit}
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
          <Button label="Save" primary size="large" type="submit" pad="small" disabled={isFetching} />
        </Form>
      </Box>
    )
};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  errors: state.organization.errors
})

export default connect(mapStateToProps, { 
  saveOrg
})(CalendarSettings);
