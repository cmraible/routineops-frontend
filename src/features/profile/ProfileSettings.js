import { Box, Card, CardBody, CardHeader, CheckBox, Heading } from 'grommet';
import { Moon, Sun } from 'grommet-icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../ui/uiSlice';


const AccountSettings = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.ui.darkMode)


  let darkLabel
  if (darkMode) {
    darkLabel = <Box direction="row" gap="small"><Moon /> Dark Mode On</Box>
  } else {
    darkLabel = <Box direction="row" gap="small"><Sun /> Dark Mode Off</Box>
  }

  return (
      <Box pad="medium" fill="horizontal" gap="medium">
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">User Interface Settings</Heading>
          </CardHeader>
          <CardBody pad="small" background="background-contrast">
            <CheckBox
              data-cy="dark-mode-toggle"
              toggle
              label={darkLabel}
              onChange={() => dispatch(toggleDarkMode())}
              checked={darkMode}
            />
          </CardBody>
        </Card>
      </Box>
  )
};

export default AccountSettings;
