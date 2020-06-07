import React from 'react';
import { Box, Button, Footer, Form, FormField, Heading, Main, Select, Text, TextInput } from 'grommet';


const Profile = () => {

  return (
    <Main justify="stretch" pad="small">
      <Heading>Profile</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form>
        <Box direction="row">
          <FormField label="First Name">
            <TextInput name="first_name" placeholder="John" />
          </FormField>
          <FormField label="Last Name">
            <TextInput name="last_name" placeholder="Doe"/>
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Email Address">
            <TextInput name="email" placeholder="jdoe@example.com"/>
          </FormField>
        </Box>
        <Box direction="row">
          <FormField label="Role">
            <Select
              options={["Technician", "Mechanic", "Supervisor", "Manager"]}
              placeholder="Supervisor"
            />
          </FormField>
        </Box>
        <Button label="Save" type="submit" />
      </Form>
    </Main>
  )

};
export default Profile;
