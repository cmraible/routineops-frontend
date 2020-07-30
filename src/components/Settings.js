import { Box, Button, CheckBoxGroup, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOrg, saveOrg } from '../actions/organization.actions';
import Spinner from './Spinner';
import Error from './Error';
import { Mixpanel } from '../mixpanel';

const Settings = ({ onSave, getOrg, organization, isFetching, errors }) => {

  useEffect(() => {
    document.title = 'Settings';
    Mixpanel.track('Viewed settings page.');
    window.Intercom('update');
  }, []);

  const weekdays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ]

  const weekday_objs = [
    {
      index: 0,
      weekday: 'Monday'
    },
    {
      index: 1,
      weekday: 'Tuesday'
    },
    {
      index: 2,
      weekday: 'Wednesday'
    },
    {
      index: 3,
      weekday: 'Thursday'
    },
    {
      index: 4,
      weekday: 'Friday'
    },
    {
      index: 5,
      weekday: 'Saturday'
    },
    {
      index: 6,
      weekday: 'Sunday'
    },
  ]

  const [ value, setValue] = useState({
    id: organization.id,
    name: (organization.name) ? organization.name : '',
    address1: (organization.address1) ? organization.address1 : '',
    address2: (organization.address2) ? organization.address2 : '',
    city: (organization.city) ? organization.city : '',
    state: (organization.state) ? organization.state : '',
    zip: (organization.zip) ? organization.zip : '',
    wkst: (organization.wkst) ? organization.wkst : 0,
    working_days: (organization.working_days) ? organization.working_days: []
  });

  useEffect(() => {
    getOrg(organization.id)
  }, [getOrg, organization.id]);

  return (
    <Main pad="medium">
      <Box flex={false}>
        <Box direction="row" align="center" gap="large">
          <Heading level={1}>Settings</Heading>
          <Spinner isFetching={isFetching} />
        </Box>
        <Error message={errors} />
        <Form
          onSubmit={({value, touch}) => {
            onSave(value)
          }}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
        >
          <Heading level={2}>Organization Information</Heading>
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
          <Heading level={2}>Calendar Information</Heading>
          <FormField label="Weekstart">
            <Select
              children={(option, index, options, state) => (<Box pad="small">{weekdays[option]}</Box>)}
              name='wkst'
              options={[0,1,2,3,4,5,6]}
              labelKey={(option) => weekdays[option]}
            />
          </FormField>
          <FormField label="Working Days">
            <CheckBoxGroup
              name='working_days'
              options={weekday_objs}
              labelKey='weekday'
              valueKey='index'
            />
          </FormField>
          <Button label="Save" primary size="large" type="submit" pad="small" disabled={isFetching} />
        </Form>
      </Box>
      
    </Main>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  errors: state.organization.errors
});

export default connect(mapStateToProps, {onSave: saveOrg, getOrg: getOrg })(Settings);
