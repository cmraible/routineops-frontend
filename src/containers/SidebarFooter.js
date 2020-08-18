import { Nav } from 'grommet';
import { Logout, Organization } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth.actions';
import {
  goToOrg,
  toggleDarkMode
} from '../actions/ui.actions';
import SidebarButton from '../components/SidebarButton';
import { getLoggedInUser } from '../reducers/reducers';

const SidebarFooter = ({logout, user, toggleDarkMode, darkMode, afterClick }) => {

  const handleClick = (callback) => {
    callback();
    if (afterClick) {
      afterClick();
    }
  }

  return (
        <Nav gap="small">
          
          {
            (user.is_org_admin && 
              <SidebarButton icon={<Organization />} label="Organization" onClick={() => handleClick(goToOrg)} />
            )
          }
          <SidebarButton
            icon={<Logout />} 
            label="Logout" 
            onClick={ () => {
              handleClick(logout);
            }}
          />
        </Nav>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  pathname: state.router.location.pathname,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, {
  goToOrg,
  logout,
  toggleDarkMode
})(SidebarFooter);
