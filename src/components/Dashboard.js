import { Heading, Main } from 'grommet';
import React, { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';

const Dashboard = () => {

  useEffect(() => {
    document.title = 'Dashboard';
    Mixpanel.track('Viewed dashboard page.');
    window.Intercom('update');
  }, []);

  return (
    <Main pad="medium" direction="column">
      <Heading>Dashboard</Heading>
      
    </Main>
  )
};

export default Dashboard;