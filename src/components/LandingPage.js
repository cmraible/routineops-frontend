import React from 'react';
import { Box, Button, Carousel, Header, Heading, Nav } from 'grommet';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  const bgUrl = process.env.PUBLIC_URL + '/landing-background.jpg'

  return (
      <Box align="stretch" direction="column" fill background={"url(" + bgUrl + ")"}>
            <Header align="center" direction="row" pad="small">
              <Heading style={{'font-family': 'Bebas Neue'}} color="white" margin="small">Operationally</Heading>
              <Nav direction="row">
                <Button as={Link} label="Login" primary="true" to="/login"/>
              </Nav>
            </Header>


          <Box fill="true" align="center" justify="center">
            <Carousel fill play={5000}>
              <Box align="center" fit="cover" fill>
                <Heading color="white">Modern software for operations management.</Heading>
                <Button as={Link} primary="true" label="Join Waitlist" />
              </Box>
              <Box align="center" fill>
                <Heading color="white">Modern software for operations management.</Heading>
                <Button as={Link} primary="true" label="Join Waitlist" />
              </Box>
              <Box align="center" fill>
                <Heading color="white">Modern software for operations management.</Heading>
                <Button as={Link} primary="true" label="Join Waitlist" />
              </Box>
            </Carousel>
          </Box>
      </Box>
  )
};
export default LandingPage;
