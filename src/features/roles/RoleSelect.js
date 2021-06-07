import { FormField, Select } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllRoles } from './rolesSlice';


const RoleSelect = ({ placeholder, name, required, multiple, title }) => {

  const roles = useSelector(selectAllRoles);

  return (
    <FormField name={name || "role"} fill="horizontal" required={(required) ? true : false} label={title || ''}>
      <Select
        name={name || "role"}
        placeholder={placeholder || "Role"}
        options={roles}
        multiple={multiple}
        labelKey="name"
        valueKey={{key: 'id', reduce: true}}
      />
    </FormField>
  )
}

export default RoleSelect;
