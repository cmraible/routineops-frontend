import React, { useState, useEffect } from 'react';
import { Box, Button, Form, List } from 'grommet';
import { getChecks } from '../actions/check.actions';
import { connect } from 'react-redux';
import ChecklistItem from './ChecklistItem';
import { completeTaskInstance } from '../actions/taskInstance.actions'; 


const Checklist = ({ checks, taskInstance, completeTaskInstance, onComplete }) => {

  const [value, setValue] = useState();

  useEffect(() => {
    getChecks()
  }, [getChecks])

  const disabled = (taskInstance.completed) ? true : false


  const submitForm = (data) => {
    // Send to "complete checklist" API endpoint with all checks
    // Wait for response from server to close
    console.log(data)
    const results = Object.keys(data).map((id) => {
      return {
        check: id,
        result: data[id]
      }
    })
    completeTaskInstance(taskInstance, results)
  }

  return (
        <Form
          onSubmit={({value, touch}) => {
            // send to server
            submitForm(value)
            onComplete()
          }}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
        >
          <Box gap="medium">
          <List
            data={checks}
            children={(check, index) => (
              <ChecklistItem check={check} disabled={disabled} index={index} />
            )}
          />
          
          {(!disabled && <Button disabled={disabled} label="Submit" primary type="submit" />)}
          </Box>
        </Form>
  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  taskTypes: state.taskTypes.byId,
  tasks: state.tasks.byId,
})

export default connect(mapStateToProps, {getChecks: getChecks, completeTaskInstance: completeTaskInstance})(Checklist)
