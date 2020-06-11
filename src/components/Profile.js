import React from 'react';
import { Box, Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';


const Profile = () => {

  return (
    <Main justify="stretch" pad="xlarge">
      <Heading>Profile</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form>
        <Box direction="row">
          <FormField label="First Name">
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name">
            <TextInput name="last_name"/>

          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Email Address">
            <TextInput name="email"/>
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Role">
            <Select
              options={["Technician", "Mechanic", "Supervisor", "Manager"]}
            />
          </FormField>
        </Box>
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};
export default Profile;
