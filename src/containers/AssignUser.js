import { Box, Button, Form, Heading, Layer, Select } from 'grommet';
import { Close } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../reducers/reducers';
import { addUserRole } from '../actions/userRole.actions';


const AssignUser = ({ organization, onClose, users, role, addUserRole }) => {

  const [value, setValue] = useState({
    role: role.id,
    organization: organization.id,
    user: undefined
  });

  const handleSubmit = ({value}) => {
    console.log(value);
    addUserRole(value);
    onClose();
  }

  return (
    <Layer position="center" modal={true} onEsc={onClose} onClickOutside={onClose}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium" gap="medium">
        <Heading>Assign user</Heading>
        <Form
          value={value}
          onChange={ newValue => setValue(newValue) }
          onSubmit={handleSubmit}
        >
          <Box gap="medium">
            <Select
              name="user" 
              options={users}
              placeholder="Select a user"
              labelKey={(user) => user.first_name + " " + user.last_name}
              valueKey={{
                key: 'id',
                reduce: true
              }}
            />
            <Box>
              <Button size="large" primary label="Assign" type="submit" />
            </Box>
          </Box>
          
        </Form>
      </Box>
    </Layer>
        
  )

};

const mapStateToProps = state => ({
  users: getAllUsers(state),
  organization: state.organization.organization
})

export default connect(mapStateToProps, {
  addUserRole
})(AssignUser);
