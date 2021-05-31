import { push } from 'connected-react-router';
import { Box, Heading } from 'grommet';
import { Edit } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import { flattenErrors } from '../../utils';
import { fetchRole, selectRoleById } from './rolesSlice';

const RoleDetail = ({match}) => {
  const dispatch = useDispatch();
  const { roleId } = match.params;
  const role = useSelector(state => selectRoleById(state, roleId))

  const [requestStatus, setRequestStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetch = async () => {
        setRequestStatus('pending');
        setErrors({});
        const resultAction = await dispatch(fetchRole(roleId))
        if (fetchRole.fulfilled.match(resultAction)) {
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
    fetch();
}, [dispatch, roleId]);

  let content

  if (requestStatus === 'pending') {
      content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (requestStatus === 'succeeded') {
      content = (
        <Box pad="medium">
          <Heading>{role.name}</Heading>
        </Box>
      )
  } else if (requestStatus === 'failed') {
      content = (
        <Error message={(errors && errors['non_field_errors']) ? errors['non_field_errors'] : undefined} />
      )
  }

  return (
    <Page
      title="Role"
      pad="small"
      action={{
        icon: <Edit />,
        label: "Edit Role",
        onClick: () => dispatch(push(`/roles/${roleId}/edit`)),
        primary: true
      }}
      previous={() => dispatch(push('/roles'))}
    >
      {content}
    </Page>
  )
};

export default RoleDetail;
