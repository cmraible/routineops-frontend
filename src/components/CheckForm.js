import {
  Box,
  Button,
  Form,
  FormField,
  Select,
  TextInput
} from 'grommet';
import { Trash } from 'grommet-icons';
import React, { useState } from 'react';

const CheckForm = ({account, check, onSubmit, onDelete }) => {

  const [value, setValue] = useState({
    id: check.id,
    account: account.id,
    prompt: (check) ? check.prompt : '',
    resultType: (check) ? check.resultType : 'BOOLEAN',
    routine: (check) ? check.routine : undefined
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
