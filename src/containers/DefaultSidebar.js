import { Box, Layer, Main, ResponsiveContext, Sidebar } from 'grommet';
import { Close, Menu } from 'grommet-icons';
import React, { useState } from 'react';
import SidebarFooter from './SidebarFooter';
import SidebarNav from './SidebarNav';
import UserMenu from './UserMenu';

const DefaultSidebar = () => {

  const [open, setOpen] = useState(false);

  const closeOverlay = () => setOpen(false);
  const openOverlay = () => setOpen(true)

  return (
    <ResponsiveContext.Consumer>
        {
          size => {
            switch (size) {
              case 'small':
                return (
                  <div>
                    <Box
                      style={{position: "absolute", right: 0}}
                      onClick={openOverlay}
                      round="full"
                      elevation="medium"
                      pad="medium"
                      margin="small"
                      background="white"
                    >
                      <Menu />
                    </Box>
                    {open && (
                      <Layer full onClickOutside={closeOverlay} onEsc={closeOverlay} >
                        <Main fill="vertical" background="black">
                          <Box align="end">
                          <Box
                              onClick={closeOverlay}
                              round="full"
                              elevation="medium"
                              pad="medium"
                              margin="small"
                            >
                              <Close />
                            </Box>
                          </Box>
                        
                          <Box pad="large" gap="xlarge">
                            <Box>
                              <UserMenu afterClick={closeOverlay} />
                            </Box>
                            <Box flex>
                              <SidebarNav afterClick={closeOverlay} />
                            </Box>
                            <Box>
                              <SidebarFooter afterClick={closeOverlay} />
                            </Box>
                          </Box>
                        </Main>
                      </Layer>
                      )
                    }
                    
                  </div>
                  
                )
              default:
                return (
                  <Sidebar
                    align="center"
                    background="black"
                    justify="between"
                    header={<UserMenu />}
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

export default DefaultSidebar;
