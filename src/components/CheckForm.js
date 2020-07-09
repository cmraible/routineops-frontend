import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Form, 
  FormField, 
  TextInput, 
  Select
} from 'grommet';
import { Trash } from 'grommet-icons';

const CheckForm = ({organization, check, onSubmit, onDelete }) => {

  const [value, setValue] = useState({
    id: check.id,
    organization: organization.id,
    prompt: (check) ? check.prompt : '',
    resultType: (check) ? check.resultType : 'BOOLEAN',
    task: (check) ? check.task : undefined
  })

  return (
    <Box pad="medium" gap="medium">
      <Form
        value={value}
        onChange={ nextValue => setValue(nextValue) }
        onSubmit={({value}) => onSubmit(value)}
      >
        <FormField label="Prompt" fill="horizontal">
          <TextInput name="prompt" />
        </FormField>
        <FormField label="Result Type" fill="horizontal" >
          <Select 
            name="resultType"
            options={[
              {
                label: 'Yes / No',
                value: 'BOOLEAN'
              }
            ]}
            labelKey="label"
            valueKey={{
              key: "value",
              reduce: true
            }}
          />
        </FormField>
        <Box direction="row" justify="between">
          <Button type="submit" label="Save" primary color="status-ok" />
          <Button icon={<Trash size="small" />} primary color="status-critical" onClick={onDelete} />
        </Box>
      </Form>
    </Box>
  )
}

export default CheckForm;
