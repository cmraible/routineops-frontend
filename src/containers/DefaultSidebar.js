import { Box, ResponsiveContext, Sidebar, Text } from 'grommet';
import { Menu } from 'grommet-icons';
import React from 'react';
import SidebarFooter from './SidebarFooter';
import {
  goToCalendar,
  goToDashboard,
  goToHome,
  goToRoles,
  goToTasks,
  goToUsers
} from '../actions/ui.actions';
import SidebarNav from './SidebarNav';
import UserMenu from './UserMenu';
import { Calendar, Checkmark, Dashboard, Group } from 'grommet-icons';
import { connect } from 'react-redux';


const DefaultSidebar = ({goToTasks, goToCalendar, goToUsers, goToDashboard, goToRoles, goToHome}) => {

  return (
    <ResponsiveContext.Consumer>
        {
          size => {
            switch (size) {
              case 'small':
                return (
                    <Box
                      style={{position: "absolute", bottom: 0}}
                      width="100%"
                      pad={{bottom: "large"}}
                      direction="row"
                      justify="between"
                      background="black"
                    >
                      <Box pad="medium" width="20%" align="center" onClick={goToUsers}>
                        <Group />
                        <Text size="xsmall">Team</Text>
                      </Box>
                      <Box pad="medium" width="20%" align="center" onClick={goToTasks}>
                        <Checkmark />
                        <Text size="xsmall">Tasks</Text>
                      </Box>
                      <Box pad="medium" width="20%" align="center" onClick={goToHome}>
                        <Menu />
                        <Text size="xsmall">Today</Text>
                      </Box>
                      <Box pad="medium" width="20%" align="center" onClick={goToCalendar}>
                        <Calendar />
                        <Text size="xsmall">Calendar</Text>
                      </Box>
                      <Box pad="medium" width="20%" align="center" onClick={goToDashboard}>
                        <Dashboard />
                        <Text size="xsmall">Dashboard</Text>
                      </Box>
                    </Box>
                )
              default:
                return (
                  <Sidebar
                    align="center"
                    background="black"
                    justify="between"
                    header={<UserMenu showLabel />}
                    footer={<SidebarFooter />}
                    flex={false}
                  >
                    <SidebarNav />
                  </Sidebar>
                )
            }
          }
        }

      </ResponsiveContext.Consumer>
  )



};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {
  goToTasks,
  goToCalendar,
  goToHome,
  goToUsers,
  goToDashboard,
  goToRoles
})(DefaultSidebar);
