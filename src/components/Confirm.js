import React, { useState, useEffect } from 'react';
import { Box, Button, Form, RadioButtonGroup, Text } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { getChecks } from '../actions/check.actions';
import { connect } from 'react-redux';

const Confirm = ({ check }) => {


  const [value, setValue] = useState();

  useEffect(() => {
    getChecks()
  }, [getChecks])

  const submitForm = (data) => {
    // Send to "complete checklist" API endpoint with all checks
    // Wait for response from server to close
    
  }


  return (
        <Form
          onSubmit={({value, touch}) => {
            // validate
            // send to server
            console.log(value)
          }}
          value={value}
          onChange={ nextValue => setValue(nextValue) }
        >
          <Box gap="medium">
          <Box align="start" direction="column" gap="medium">
            <Text>{check.prompt}</Text>
            <RadioButtonGroup
              name="radio"
              direction="row"
              gap="xsmall"
              options={["Yes", "No"]}
            >
              {(option, { checked, hover }) => {
                const Icon = option === "Yes" ? Checkmark : Close;
                let background;
                if (checked && option === "Yes") background = "status-ok";
                else if (checked && option === "No") background = "status-critical";
                else if (hover) background = "light-4";
                else background = "light-2";
                return (
                  <Box background={background} gap="small" pad="small" direction="row">
                    <Icon />
                    <Text size="medium">{option}</Text>
                  </Box>
                );
              }}
            </RadioButtonGroup>
          </Box>
          <Button label="Submit" primary type="submit" />
          </Box>
        </Form>

  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  taskTypes: state.taskTypes.byId,
  tasks: state.tasks.byId,
})

export default connect(mapStateToProps, {getChecks: getChecks})(Confirm)
