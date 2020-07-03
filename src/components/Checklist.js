import React, { useState, useEffect } from 'react';
import { Box, Button, Form, List } from 'grommet';
import { getChecks } from '../actions/check.actions';
import { connect } from 'react-redux';
import ChecklistItem from './ChecklistItem';

const Checklist = ({ checks }) => {

  console.log(checks)

  const [value, setValue] = useState();

  useEffect(() => {
    getChecks()
  }, [getChecks])

  return (
        <Form>
          <Box gap="medium">
          <List
            data={checks}
            children={(check, index) => (
              <ChecklistItem check={check} index={index} />
            )}
          />
          <Button label="Submit" primary />
          </Box>
        </Form>

  )

};

const mapStateToProps = state => ({
  taskLayers: state.taskLayers.byId,
  taskTypes: state.taskTypes.byId,
  tasks: state.tasks.byId,
})

export default connect(mapStateToProps, {getChecks: getChecks})(Checklist)
