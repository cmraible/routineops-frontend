import { Accordion, AccordionPanel, Box, Button, DataTable, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllTaskLayers, getAllUserRoles } from '../reducers/reducers';
import { deleteUserRole } from '../actions/userRole.actions';
import RoleForm from './RoleForm';
import AccordionHeader from '../components/AccordionHeader';


const Role = ({ role, taskLayers, tasksById, userRoles, usersById, deleteUserRole }) => {

  useEffect(() => {
    document.title = (role) ? role.name : 'Role'
    window.analytics.page('Role');
  }, [role]);

  const filteredTaskLayers = taskLayers.filter((layer) => layer.role === role.id);
  const filteredUserRoles = userRoles.filter((userRole) => userRole.role === role.id);

  const [activeIndex, setActiveIndex] = useState([]);

  return (
    <Box flex={false}>
      <RoleForm role={role} />
      <Accordion 
        multiple
        activeIndex={activeIndex}
        onActive={newActiveIndex => setActiveIndex(newActiveIndex)}
      >
        <AccordionPanel header={<AccordionHeader active={activeIndex.includes(0)} label="Users" count={filteredUserRoles.length} />}>
          <DataTable 
            data={filteredUserRoles}
            columns={[
              {
                property: 'name',
                header: <Text weight="bold">Name</Text>,
                primary: true,
                render: userRole => <Text>{usersById[userRole.user].first_name} {usersById[userRole.user].last_name}</Text>
              },
              {
                header: '',
                property: 'id',
                render: userRole => <Button icon={<Trash size="small" />} onClick={() => deleteUserRole(userRole.id)} />,
                align: "end"
              }
            ]}
          />
        </AccordionPanel>
        <AccordionPanel header={<AccordionHeader active={activeIndex.includes(1)} count={filteredTaskLayers.length} label="Recurring Tasks" />}>
          <DataTable 
            data={filteredTaskLayers}
            columns={[
              {
                property: 'task',
                header: <Text weight="bold">Task</Text>,
                primary: true,
                render: layer => <Text>{tasksById[layer.task].name}</Text>
              },
              {
                property: 'frequency',
                header: <Text weight="bold">Frequency</Text>,
                render: layer => <Text>{layer.label}</Text>
              }
            ]}
          />
        </AccordionPanel>
      </Accordion>
    </Box>    
  )

};

const mapStateToProps = (state) => ({
  rolesById: state.roles.byId,
  usersById: state.users.byId,
  userRoles: getAllUserRoles(state),
  taskLayers: getAllTaskLayers(state),
  tasksById: state.tasks.byId,
  isFetching: state.roles.isFetching,
  errors: state.roles.errors
})

export default connect(mapStateToProps, {
  deleteUserRole
})(Role)
