import { Main, Heading } from 'grommet';
import React, { useEffect } from 'react';
import { Mixpanel } from '../mixpanel';


const Page = ({ title, children }) => {

  useEffect(() => {
    document.title = title;
    Mixpanel.track(`Viewed ${title.toLowerCase()} page.`);
    window.Intercom('update');
  }, [title]);

  return (
    <Main pad="medium" direction="column" gap="medium">
      <Heading margin={{vertical: "none"}}>{ title }</Heading>
      {children}
    </Main>
  )
}

export default Page;
