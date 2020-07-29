import { Box, Button, Layer, Main, ResponsiveContext, Sidebar } from 'grommet';
import { Close, Menu } from 'grommet-icons';
import React, { useState } from 'react';
import SidebarFooter from './SidebarFooter';
import SidebarNav from './SidebarNav';
import UserMenu from './UserMenu';

const DefaultSidebar = () => {

  const [open, setOpen] = useState(false);

  const closeOverlay = () => {
    setOpen(false)
  }

  const openOverlay = () => {
    setOpen(true)
  }


  return (
    <ResponsiveContext.Consumer>
        {
          size => {
            console.log(size);
            switch (size) {
              case 'small':
                return (
                  <div>
                    <Button
                      style={{position: "absolute", right: 0}}
                      icon={<Menu />}
                      onClick={openOverlay}
                    />
                    {open && (
                      <Layer full onClickOutside={closeOverlay} onEsc={closeOverlay} >
                        <Main fill="vertical">
                          <Box align="end">
                            <Button icon={<Close />} onClick={closeOverlay} />
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
