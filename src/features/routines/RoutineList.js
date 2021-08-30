import { push } from 'connected-react-router';
import { Box, Button, List, Text } from 'grommet';
import { Add, CircleInformation } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Page from '../../components/Page';
import UserMenu from '../users/UserMenu';
import Spinner from '../../components/Spinner';
import RoutineItem from './RoutineItem';
import { fetchRoutines, selectRoutineIds } from './routinesSlice';
import { selectLoggedInUser } from '../auth/authSlice';

const RoutineList = () => {

  const dispatch = useDispatch();
  const routineIds = useSelector(selectRoutineIds);
  const user = useSelector(selectLoggedInUser);

  const [requestStatus, setRequestStatus] = useState('idle');

  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      const resultAction = await dispatch(fetchRoutines())
      if (fetchRoutines.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded')
      } else {
        setRequestStatus('failed');
      }
    }
    fetch()
  }, [dispatch])

  let content
  if (requestStatus === 'pending') {
    // Display a spinner to indicate loading state
    content = <Spinner />
  } else if (requestStatus === 'succeeded') {
    if (routineIds.length > 0) {
      // Display list of routines
      content = (
        <List 
          data={routineIds} 
          pad="none"
          children={(datum, index) => <RoutineItem id={datum} actions={true} key={datum} />}
        />
      )
    } else {
      // Display a message saying there are no routines
      content = (
        <Box gap="medium" align="center" pad="medium">
          <CircleInformation />
          <Text size="large">You don't have any routines yet.</Text>
          <Button size="large" icon={<Add/>} label="Add Routine" onClick={() => dispatch(push('/routines/add'))} />
        </Box>
      )
    }
  } else if (requestStatus === 'failed') {
    content = <Message type="error" message="Unable to fetch routines." />
  }

  return (
    <Page
      title={"Routines"}
      action={{
        label: "Add Routine",
        icon: <Add />,
        onClick: () => dispatch(push('routines/add')),
        primary: true
      }}
      userMenu={<UserMenu mobile user={user} />}
    >
      <Box fill>
        {content}
      </Box>
    </Page>
  )
};

export default RoutineList;
