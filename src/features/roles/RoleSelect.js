import { FormField, Select } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllRoles } from './rolesSlice';


const RoleSelect = ({ placeholder, name, required }) => {

  const roles = useSelector(selectAllRoles);

  return (
    <FormField name={name || "role"} fill="horizontal" required={(required) ? true : false}>
      <Select
        name={name || "role"}
        placeholder={placeholder || "Role"}
        options={roles}
        labelKey="name"
        valueKey={{key: 'id', reduce: true}}
      />
    </FormField>
  )
}

export default RoleSelect;
