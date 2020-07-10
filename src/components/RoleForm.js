import { Box, Button, Form, FormField, Heading, TextInput } from 'grommet';
import { Save, Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteRole, getRole, saveRole } from '../actions/role.actions';
import { goToRoles } from '../actions/ui.actions';
import ConfirmDelete from './ConfirmDelete';
import Spinner from './Spinner';

const RoleForm = ({ role, getRole, deleteRole, saveRole, isFetching }) => {

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
        <Box fill="horizontal">
          <Box direction="row" align="center" gap="medium">
           <Heading level={2}>Role Information</Heading>
           {(isFetching && <Spinner />)}
          </Box>
         
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
