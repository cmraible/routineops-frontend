import React from 'react';
import { Box, Text, RadioButtonGroup } from 'grommet';
import { Checkmark, Close } from 'grommet-icons';
import { getChecks } from '../actions/check.actions';
import { connect } from 'react-redux';
import { getAllChecks } from '../reducers/reducers';

const ChecklistItem = ({ check, index }) => {

  const number = (index >= 0) ? `${index + 1}. ` : '';

  return (
    <Box align="start" direction="column" gap="medium">
      <Text>{number}{check.prompt}</Text>
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
  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  taskTypes: state.taskTypes.byId,
  tasks: state.tasks.byId,
  checks: getAllChecks(state)
})

export default connect(mapStateToProps, {getChecks: getChecks})(ChecklistItem)
