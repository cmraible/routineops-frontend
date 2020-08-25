import { Box, Form, List, Text } from 'grommet';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCheck, deleteCheck, saveCheck } from '../actions/check.actions';
import { getAllChecks, getAllRoles, getAllTaskLayers } from '../reducers/reducers';
import CheckOverlay from '../components/CheckOverlay';
import InlineInput from '../components/InlineInput';


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
      <List
        primaryKey="name"
        data={checks}
        children={(datum, index) => (
          <Box direction="row" align="center">
            <Text>{index+1}. {datum.prompt}</Text>
          </Box>
        )}
        onClickItem={onOpenCheck}
      />
      <Form
        onSubmit={({value, touch}) => {
          addCheck(value)
          setCheckValue({prompt: '', resultType: 'BOOLEAN', organization: organization.id, task: task.id})
        }}
        value={checkValue}
        onChange={ nextValue => setCheckValue(nextValue) }
      >
        <Box direction="row" pad={{horizontal: "medium"}} align="center">
          <Text color="text-xweak">{checks.length + 1}.</Text><InlineInput required name="prompt" placeholder="Type here and hit Enter to add a question." />              
        </Box>
      </Form>
      
      {
        openCheck && (
          <CheckOverlay organization={organization} check={openCheck} onDelete={deleteCheck} onClose={onCloseCheck} onSave={saveCheck} />
        )
      }
    </Box>
  )

};

const mapStateToProps = (state) => ({
  organization: state.organization.organization,
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
