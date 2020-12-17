import { Anchor, Text } from 'grommet';
import React from 'react';
import Page from './Page';


const NotFound = ({ path, text}) => {
  return (
    <Page title="Not Found">
      <Text>Page not found.</Text>
      <Text>Go to <Anchor href={path}>{ text }</Anchor>?</Text>
    </Page>
  )
}

export default NotFound
