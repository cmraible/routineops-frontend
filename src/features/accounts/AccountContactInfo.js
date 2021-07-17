import { Box, Card, CardBody, CardHeader, Heading } from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EditDescription from '../../components/EditDescription';
import EditNameModal from './AccountName';
import { selectUserAccount } from './accountsSlice';

const AccountContactInfo = () => {

  const account = useSelector(selectUserAccount)

  // Show / hide the name modal
  const [name, setName] = useState(false);

  return (
    <Box>
      <Box pad="medium" gap="medium" flex={false}>
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">Contact Info</Heading>
          </CardHeader>
          <CardBody flex={false} pad="small" background="background-contrast">
            <EditDescription 
                title="Name"
                description={account.name}
                onClick={() => setName(true)}
            />
          </CardBody>
        </Card>
      </Box>

      {(name && <EditNameModal close={() => setName(false)} />)}

    </Box>
  )
};

export default AccountContactInfo;
