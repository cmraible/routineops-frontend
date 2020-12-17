import { Box, CheckBox } from 'grommet';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { toggleDarkMode } from '../ui/uiSlice';


const AccountSettings = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.ui.darkMode)

  return (
      <Box pad="medium">
        <CheckBox id="toggleDarkMode" toggle label={(darkMode) ? "Dark Mode On" : "Dark Mode Off" } onChange={() => dispatch(toggleDarkMode())} checked={darkMode} />
      </Box>
  )
};

export default AccountSettings;
