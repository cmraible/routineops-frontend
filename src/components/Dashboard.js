import { Heading, Main } from 'grommet';
import React, { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';

const Dashboard = () => {

  useEffect(() => {
    Mixpanel.track('Viewed dashboard page.')
  }, []);

  return (
    <Main pad="medium" direction="column">
      <Heading>Dashboard</Heading>
      
    </Main>
  )
};

export default Dashboard;