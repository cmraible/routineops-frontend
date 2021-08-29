import { Box, Spinner, ThemeContext } from 'grommet';
import React from 'react';
import { useSelector } from 'react-redux';





const AppSpinner = () => {

  const darkMode = useSelector(state => state.ui.darkMode)
  const fill = darkMode ? "#FFFFFF" : "#000000";
  const themeWithAnimatedIcon = {
    spinner: {
      icon: (
        <svg viewBox="0 0 96 96" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>RoutineOpsLogo</title>
            <g id="Marketing-Site" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Desktop-HD" transform="translate(-34.000000, -32.000000)">
                    <g id="Group" transform="translate(34.000000, 32.000000)" fill={fill} fill-rule="nonzero">
                        <g id="logo">
                            <path d="M48,0 C57.9206788,0 66.3035471,1.53781043 73.1486051,4.61343128 L47.3813832,43.7883364 L38.196467,32.4439294 L38.1257457,32.358013 C35.7733606,29.546976 31.591915,29.13328 28.7324808,31.4483929 C25.8441633,33.7868907 25.3984465,38.0240616 27.7369443,40.912379 L27.7369443,40.912379 L42.7148144,59.4117949 L42.8015858,59.5168623 C45.6905691,62.9463699 51.0884126,62.6430106 53.5665432,58.8752106 L53.5665432,58.8752106 L84.2385954,12.2409912 C92.0795318,20.2401926 96,32.1598622 96,48 C96,80 80,96 48,96 C16,96 0,80 0,48 C0,16 16,0 48,0 Z" id="Combined-Shape"></path>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
      ),
      container: { animation: undefined}
    }
  }

  return (
    <ThemeContext.Extend value={themeWithAnimatedIcon} >
      <Box fill align="center" justify="center">
        <Spinner
          animation={[
            { type: 'pulse', duration: 1000, size: 'large' },
          ]}
          border={false}
        />
      </Box>
    </ThemeContext.Extend>
    
  )

};

export default AppSpinner;
