import React from 'react';
import { Box, Button, Carousel, Header, Heading, Nav } from 'grommet';


const LandingPage = () => {
  const bgUrl = process.env.PUBLIC_URL + '/landing-background.jpg'

  return (
      <Box align="stretch" direction="column" fill background={"url(" + bgUrl + ")"}>
            <Header align="center" direction="row" pad="small">
              <Heading style={{'fontFamily': 'Bebas Neue'}} color="white" margin="small">Operationally</Heading>
              <Nav direction="row">
                <Button color="white" label="Login" plain href="/login" />
              </Nav>
            </Header>


          <Box fill align="center" justify="center">
              <Box align="start" fill pad="xlarge">
                <Heading color="white">Modern software for operations management.</Heading>
                <Button color="white" label="Sign Up" primary href="signup" />
              </Box>
          </Box>
      </Box>
  )
};
export default LandingPage;
