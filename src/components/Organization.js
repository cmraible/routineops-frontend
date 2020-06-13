import React from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { saveOrg, getOrg } from '../actions/actions';
import { connect } from 'react-redux';

class Organization extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      organization: props.organization,
    }
  }

  componentDidMount() {
    this.props.getOrg(this.state.organization.id)
  }

  render() {
    return (
      <Main pad="medium">
        <Heading level={1}>Organization</Heading>
        <Heading level={3}>Basic Information</Heading>
        <Form
          onSubmit={({value, touch}) => {
            this.props.saveOrg(value)
          }}
          value={this.state.organization}
          onChange={ nextValue => this.setState({organization: nextValue}) }
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
  }

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
    },
    getOrg: (id) => {
      dispatch(getOrg(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
