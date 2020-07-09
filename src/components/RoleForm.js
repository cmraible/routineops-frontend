import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, FormField, Heading, TextArea, TextInput } from 'grommet';
import { Trash, Save } from 'grommet-icons';
import { goToRoles } from '../actions/ui.actions';
import { getRole, deleteRole, saveRole } from '../actions/role.actions';
import ConfirmDelete from './ConfirmDelete';

const RoleForm = ({ role, getRole, deleteRole, saveRole }) => {

  useEffect(() => {
    getRole(role.id)
  }, [getRole]);
  
  // Set up state for Task form
  const [roleValue, setRoleValue] = useState({
    id: role.id,
    name: role.name,
    organization: role.organization
  })

  // Setup state for delete confirm overlay
  const [openDelete, setOpenDelete] = useState()
  const onOpenDelete = (event) => setOpenDelete(true);
  const onCloseDelete = () => setOpenDelete(undefined);

  // Define function to delete a task
  const onDelete = (role_id) => {
    deleteRole(role_id)
    goToRoles()
  }

  // Define what happens when the task form is submitted
  const submitForm = (value) => {
    console.log(value);
    saveRole(value)
  }

  return (
        <Box pad="medium" fill="horizontal">
         <Heading level={2}>Role Information</Heading>
          <Form
            value={roleValue}
            onChange={ nextValue => setRoleValue(nextValue) }
            onSubmit={({value}) => submitForm(value)}
          >
            <FormField label="Role Name">
              <TextInput name="name" />
            </FormField>
            <Box justify="between" direction="row">
              <Button color="status-ok" icon={<Save />} label="Save" pad="small" primary type="submit" />
              <Button color="status-critical" icon={<Trash size="small" />} primary pad="small" onClick={onOpenDelete} />
            </Box>
          </Form>
          {
            openDelete && 
            <ConfirmDelete 
              onClick={() => onDelete(role.id)} 
              onClose={onCloseDelete}
              message="This action will permanently delete role task and all data associated with it."
            />
          }
        </Box>


  )

};

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps, {
  getRole,
  saveRole,
  deleteRole
})(RoleForm)
