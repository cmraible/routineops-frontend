import React from 'react';
import { Box, Button, Form, FormField, Heading, Main, TextInput } from 'grommet';

const Login = (props) => {
    return (
      <Main pad="xlarge">
      <Heading>
        Hello.
      </Heading>
      <Form
        onSubmit={({value, touch}) => {
          props.loginFunction(value.username, value.password)
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
  )
}

export default Login;
