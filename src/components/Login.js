import React, { Component } from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';
import { authenticate } from '../api.js'

class Login extends Component {

  render() {
    return (
      <Main pad="large">
        <Heading>
          Hello.
        </Heading>
        <Form
          onSubmit={({value, touch}) => {
            authenticate(value.username, value.password)
          }}
        >
          <FormField name="username" htmlfor="username-id">
            <TextInput id="username-id" name="username" placeholder="Username" />
          </FormField>
          <FormField name="password" htmlfor="password-id">
            <TextInput id="password-id" name="password" type="password" placeholder="Password" />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Login" size="large" />
          </Box>
        </Form>
      </Main>
    );
  }

};
export default Login;
