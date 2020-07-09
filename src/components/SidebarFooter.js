import { Footer, Nav } from 'grommet';
import { Logout, SettingsOption } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';
import {
  goToSettings
} from '../actions/ui.actions';
import { logout } from '../actions/auth.actions';
import SidebarButton from './SidebarButton';

const SidebarFooter = ({logout, user }) => {

  return (
      <Footer>
        <Nav>
          {
            (user.is_org_admin && 
              <SidebarButton icon={<SettingsOption />} label="Settings" onClick={() => goToSettings() } />
            )
          }
          <SidebarButton icon={<Logout />} label="Logout" onClick={() => logout() } />
        </Nav>
      </Footer>
  )
};

const mapStateToProps = state => ({
  user: state.user,
  pathname: state.router.location.pathname
});

export default connect(mapStateToProps, {
  goToSettings,
  logout
})(SidebarFooter);
