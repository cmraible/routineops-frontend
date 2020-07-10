import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Form, Heading, Text, List, TextInput } from 'grommet';
import { Add } from 'grommet-icons';
import { addCheck, saveCheck, deleteCheck } from '../actions/check.actions';
import { getAllChecks, getAllRoles, getAllTaskLayers } from '../reducers/reducers';
import CheckOverlay from './CheckOverlay';


const TaskChecks = ({ organization, task, addCheck, saveCheck, deleteCheck, allChecks }) => {

  const checks = allChecks.filter((check) => check.task === task.id)

  // Set up state for new Check form
  const [checkValue, setCheckValue] = useState({
    organization: organization.id,
    prompt: '',
    resultType: 'BOOLEAN',
    task: task.id
  })

  // Set up state for Check overlay
  const [openCheck, setOpenCheck] = useState()
  const onOpenCheck = (event) => setOpenCheck(event.item)
  const onCloseCheck = () => setOpenCheck(undefined)

  return (
    <Box>
      <Heading level={2}>Checks</Heading>
      <Form
        onSubmit={({value, touch}) => {
          addCheck(value)
          setCheckValue({prompt: '', resultType: 'BOOLEAN', organization: organization.id, task: task.id})
        }}
        value={checkValue}
        onChange={ nextValue => setCheckValue(nextValue) }
      >
        <Box direction="row" gap="small" margin={{bottom: "medium"}}>
          <TextInput required name="prompt" placeholder="Add a check" />              
          <Button type="submit" size="small" primary icon={<Add />} />
        </Box>
      </Form>
      <List
        primaryKey="name"
        data={checks}
        children={(datum, index) => (
          <Box direction="row" align="center" gap="medium">
            <Text>{index+1}. {datum.prompt}</Text>
          </Box>
        )}
        onClickItem={onOpenCheck}
      />
      {
        openCheck && (
          <CheckOverlay organization={organization} check={openCheck} onDelete={deleteCheck} onClose={onCloseCheck} onSave={saveCheck} />
        )
      }
    </Box>
  )

};

const mapStateToProps = (state) => ({
  organization: state.organization,
  roles: getAllRoles(state),
  taskLayers: getAllTaskLayers(state),
  checksById: state.checks.byId,
  allChecks: getAllChecks(state),
  tasksById: state.tasks.byId
})

export default connect(mapStateToProps, {
  addCheck,
  saveCheck,
  deleteCheck
})(TaskChecks)
