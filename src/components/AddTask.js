import React from 'react';
import { Button, Form, FormField, Heading, Main, Select, TextInput } from 'grommet';


const AddTask = () => {

  return (
    <Main justify="stretch" pad="xlarge">
      <Heading>Add Task</Heading>
      <Form>
        <FormField label="Description">
          <TextInput name="description" />
        </FormField>
        <FormField label="Role">
          <Select
            options={["Technician", "Mechanic", "Supervisor", "Manager"]}
          />
        </FormField>
        <Button label="Save" primary size="large" type="submit" />
      </Form>
    </Main>
  )

};
export default AddTask;
