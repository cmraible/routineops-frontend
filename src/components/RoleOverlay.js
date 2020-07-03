import React, { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, Select, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import { saveRole } from '../actions/role.actions';
import { connect } from 'react-redux';

const RoleOverlay = ({ role, saveRole, onClose, deleteRole }) => {

  const [value, setValue] = useState(role);

  const onDelete = () => {
    deleteRole(role.id)
    onClose()
  }

  const onSave = (value) => {
    saveRole(value)
    onClose()
  }

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium">
        <Heading>Edit Role</Heading>
        <Form
          value={value}
          onChange={ nextValue => setValue(nextValue) }
          onSubmit={({value}) => onSave(value)}
        >
        <FormField label="Role Name">
           <TextInput name="name" />
        </FormField>
          <Box gap="medium">
            <Button color="status-ok" label="Save" pad="small" primary size="large" type="submit" />
            <Button color="status-critical" label="Delete Role" onClick={onDelete} pad="small" primary size="small" />
          </Box>
        </Form>

      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {saveRole: saveRole})(RoleOverlay)
