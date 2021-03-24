import { ResponsiveContext } from 'grommet';
import React from 'react';
import DesktopSidebar from '../components/DesktopSidebar';
import DesktopSidebarItem from '../components/DesktopSidebarItem';
import MobileFooter from '../components/MobileFooter';
import MobileFooterItem from '../components/MobileFooterItem';
import { Checkmark, Home, Group, User, Organization } from 'grommet-icons';
import { selectUserAccount } from '../features/accounts/accountsSlice';
import { useSelector } from 'react-redux';


const AppNavigation = () => {
  // Renders the main app navigation bar
  // Mobile: tab bar stickied to the bottom of the viewport
  // Desktop and Tablet: Sidebar with the same navigation items
  // Also displays different options depending on Account.type

  const pathname = window.location.pathname
  const account = useSelector(selectUserAccount);

  const individualLinks = [
    {label: 'Tasks', icon: <Checkmark />, href: '/tasks', active: (pathname.startsWith('/tasks'))},
    {label: 'Home', icon: <Home />, href: '/', active: (pathname === '/' || pathname === '')},
    {label: 'Account', icon: <User />, href: '/account', active: (pathname.startsWith('/account'))},
  ]

  const teamLinks = [
    {label: 'Tasks', icon: <Checkmark />, href: '/tasks', active: (pathname.startsWith('/tasks'))},
    {label: 'Home', icon: <Home />, href: '/', active: (pathname === '/')},
    {label: 'Roles', icon: <Group />, href: '/roles', active: (pathname.startsWith('/roles'))},
    {label: 'Team', icon: <Organization />, href: '/team', active: (pathname.startsWith('/team'))},
  ]

  const links = (account && account.type === 'Team') ? teamLinks : individualLinks;

  return (
    <ResponsiveContext.Consumer>
        {
          size => {
            switch (size) {
              case 'small':
                return (
                    <MobileFooter>
                      {(
                        links.map((link) => {
                          return (
                            <MobileFooterItem key={link.label} {...link} />
                          )
                        })
                      )}
                    </MobileFooter>

                )
              default:
                return (
                  <DesktopSidebar>
                      {(
                        links.map((link) => {
                          return (
                            <DesktopSidebarItem key={link.label} {...link} />
                          )
                        })
                      )}
                  </DesktopSidebar>
                )
            }
          }
        }

      </ResponsiveContext.Consumer>
  )
};

export default AppNavigation;
