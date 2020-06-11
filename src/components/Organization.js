import React from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';


const Organization = () => {

  return (
    <Main pad="medium">
      <Heading level={1}>Organization</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form>
        <FormField label="Organization Name">
          <TextInput name="name" />
        </FormField>
        <FormField label="Address">
          <TextInput name="address"/>
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
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};
export default Organization;
