import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';
import { saveUser } from '../actions/user.actions'
import { getAllRoles } from '../reducers/reducers';


const Profile = ({ onSave, user, roles }) => {

  console.log(user.role)
  const [ value, setValue ] = useState({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: (user.role) ? user.role : {}  
  });

  console.log(roles)

  return (
    <Main pad="medium">
      <Heading>Profile</Heading>
      <Heading level={3}>Basic Information</Heading>
      <Form
        onSubmit={({value, touch}) => {
          onSave(value)
        }}
        value={value}
        onChange={ nextValue => setValue(nextValue) }
      >
          <FormField label="First Name">
            <TextInput name="first_name" />
          </FormField>
          <FormField label="Last Name">
            <TextInput name="last_name" />
          </FormField>
          <FormField label="Email Address">
            <TextInput name="email" />
          </FormField>
          <FormField label="Role">
            <Select 
              name="role"
              options={roles} 
              labelKey="name"
              valueKey={{
                key: 'id',
                reduce: true
              }}
            />
          </FormField>
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};

const mapStateToProps = state => ({
  user: state.user,
  roles: getAllRoles(state)
});

export default connect(mapStateToProps, { onSave: saveUser })(Profile);
