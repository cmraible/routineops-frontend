import React from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';


const Organization = () => {

  return (
    <Main justify="stretch" pad="small">
      <Heading level={1}>Organization</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form>
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
          <FormField label="Zipcode">
            <TextInput name="zip"/>
          </FormField>
        </Box>
        <Button label="Save" type="submit" />
      </Form>
    </Main>
  )

};
export default Organization;
