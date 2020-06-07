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
            <TextInput name="name" placeholder="Operationally, LLC" />
          </FormField>
          <FormField label="Address 1">
            <TextInput name="address1" placeholder="123 Example Street"/>
          </FormField>
          <FormField label="Address 2">
            <TextInput name="address2" placeholder="Apt 1"/>
          </FormField>
          <Box direction="row">
            <FormField label="City">
              <TextInput name="city" placeholder="San Jose"/>
            </FormField>
            <FormField label="State">
              <TextInput name="state" placeholder="California"/>
            </FormField>
            <FormField label="Zipcode">
              <TextInput name="zip" placeholder="95111"/>
            </FormField>
          </Box>
          <Button label="Save" type="submit" />
        </Form>
      </Main>
    );
  }

};
export default Signup;
