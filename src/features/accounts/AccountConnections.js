import { Box, Button, List } from 'grommet';
import { Add } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import Error from '../../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialAccounts, selectAllSocialAccounts } from '../socialaccounts/socialAccountsSlice';
import { flattenErrors } from '../../utils';
import Spinner from '../../components/Spinner';
import SocialAccountItem from '../socialaccounts/SocialAccountItem';
import AddSocialAccount from '../socialaccounts/AddSocialAccount';



const AccountConnections = () => {

  const socialAccounts = useSelector(selectAllSocialAccounts)
  const dispatch = useDispatch()

  const [requestStatus, setRequestStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [add, setAdd] = useState(false)


  useEffect(() => {
    const fetch = async () => {
      setRequestStatus('pending');
      setErrors({});
      const resultAction = await dispatch(fetchSocialAccounts())
      if (fetchSocialAccounts.fulfilled.match(resultAction)) {
        setRequestStatus('succeeded');
      } else {
        setRequestStatus('failed');
        if (resultAction.payload) {
          setErrors(flattenErrors(resultAction.payload))
        } else {
          setErrors({'non_field_errors': resultAction.error.message})
        }
      }
    }
    fetch()
  }, [dispatch, add]);

  let content

  if (requestStatus === 'pending') {
    content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (requestStatus === 'failed') {
    content = (
      <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
    )
  } else {
    content = (
      <List
        data={socialAccounts}
        children={(datum, index) => <SocialAccountItem socialAccount={datum} />}
      />
    )
  }

  return (
      <Box>
        <Box align="end" pad="medium">
          <Button
            fill={false}
            primary
            size="large"
            icon={<Add />}
            label="Add Connection"
            onClick={() => setAdd(true)}
          />
        </Box>
        {content}
        {(add && <AddSocialAccount close={() => {
          setTimeout(() => {
            setAdd(false)
          }, 2000)
          }} />)}
      </Box>


  )
};

export default AccountConnections;
