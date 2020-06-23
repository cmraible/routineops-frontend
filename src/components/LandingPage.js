import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Header, Heading, Nav } from 'grommet';
import { goToSignup, goToLogin } from '../actions/ui.actions';


const LandingPage = ({ goToSignup, goToLogin }) => {
  const bgUrl = process.env.PUBLIC_URL + '/landing-background.jpg'

  return (
      <Box align="stretch" direction="column" fill background={"url(" + bgUrl + ")"}>
            <Header align="center" direction="row" pad="small">
              <Heading style={{'fontFamily': 'Bebas Neue'}} color="white" margin="small">Operationally</Heading>
              <Nav direction="row">
                <Button color="white" label="Login" onClick={() => goToLogin() } plain />
              </Nav>
            </Header>

          <Box fill align="center" justify="center">
              <Box align="start" fill pad="xlarge">
                <Heading color="white">Modern software and professional services to help you operate more effectively.</Heading>
                <Button color="white" label="Sign Up" onClick={() => goToSignup() } primary />
              </Box>
          </Box>
      </Box>
  )
};

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    goToSignup: () => {
      dispatch(goToSignup())
    },
    goToLogin: () => {
      dispatch(goToLogin())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
