import React, { useState } from 'react';
import { Box, Button, Form, Heading, Select, FormField, CheckBoxGroup,  } from 'grommet'
import { connect } from 'react-redux';
import { saveOrg } from '../actions/organization.actions';
import { weekdays, weekday_objs } from '../utils';

const OrgCalendarSettings = ( { organization, isFetching, saveOrg } ) => {

    const [ value, setValue] = useState({
      id: organization.id,
      wkst: (organization.wkst) ? organization.wkst : 0,
      working_days: (organization.working_days) ? organization.working_days: []
    });

    const handleSubmit = ({value}) => {
      saveOrg(value)
    }

    return (
    <Box flex={false}>
      <Heading margin="none" level={2}>Calendar Information</Heading>
        <Form
          onSubmit={handleSubmit}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
        >
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
    )
};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  isFetching: state.organization.isFetching,
  errors: state.organization.errors
})

export default connect(mapStateToProps, { 
  saveOrg
})(OrgCalendarSettings);
