import React, { Component } from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';

class Signup extends Component {

  render() {
    return (
      <Main pad="large">
        <Heading>
          Welcome.
        </Heading>
        <Form>
          <FormField label="Organization Name">
            <TextInput name="name" />
          </FormField>
          <FormField label="Address">
            <TextInput name="address" />
          </FormField>
          <Box direction="row">
            <FormField label="City">
              <TextInput name="city" />
            </FormField>
            <FormField label="State">
              <TextInput name="state" />
            </FormField>
            <FormField label="Zipcode">
              <TextInput name="zip" />
            </FormField>
          </Box>
          <Button label="Save" type="submit" />
        </Form>
      </Main>
    );
  }

};
export default Signup;
