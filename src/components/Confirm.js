import { Box, Button, Form, RadioButtonGroup, Text } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getChecks } from '../actions/check.actions';
import { completeTaskInstance } from '../actions/taskInstance.actions';


const Confirm = ({ taskInstance, check, completeTaskInstance, onComplete }) => {


  const [value, setValue] = useState();

  const disabled = (taskInstance.completed) ? true : false

  useEffect(() => {
    getChecks()
  }, [getChecks])

  const submitForm = (data) => {
    // Send to "complete checklist" API endpoint with all checks
    // Wait for response from server to close
    console.log(data)
    const results = [
      {
        check: check.id,
        result: data.radio
      }
    ]
    console.log(results)
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
          <Box align="start" direction="column" gap="medium">
            <Text>{check.prompt}</Text>
            <RadioButtonGroup
              name="radio"
              disabled={disabled}
              direction="row"
              gap="xsmall"
              options={[
                {
                  name: 'Yes',
                  value: true,
                  label: 'Yes'
                }, 
                {
                  name: 'No',
                  value: false,
                  label: 'No'
                }
              ]}
            >
              {(option, { checked, hover }) => {
                const Icon = option.name === "Yes" ? Checkmark : Close;
                let background;
                if (checked && option.name === "Yes") background = "status-ok";
                else if (checked && option.name === "No") background = "status-critical";
                else if (hover) background = "light-4";
                else background = "light-2";
                return (
                  <Box background={background} gap="small" pad="small" direction="row">
                    <Icon />
                    <Text size="medium">{option.label}</Text>
                  </Box>
                );
              }}
            </RadioButtonGroup>
          </Box>
          {(!disabled && <Button label="Submit" primary type="submit" /> )}
          </Box>
        </Form>

  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  tasks: state.tasks.byId,
})

export default connect(mapStateToProps, {getChecks: getChecks, completeTaskInstance: completeTaskInstance})(Confirm)
