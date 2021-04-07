import { Box, Form, FormField, TextInput } from 'grommet';
import { Checkmark } from 'grommet-icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/Error';
import Page from '../../components/Page';
import Spinner from '../../components/Spinner';
import SubmitButton from '../../components/SubmitButton';
import { flattenErrors } from '../../utils';
import { fetchRole, selectRoleById, updateRole } from './rolesSlice';

const RoleEdit = ({match}) => {
  const dispatch = useDispatch();
  const { roleId } = match.params;

  const role = useSelector(state => selectRoleById(state, roleId));

  const [value, setValue] = useState(role);
  const [fetchStatus, setFetchStatus] = useState('idle');
  const [updateStatus, setUpdateStatus] = useState('idle');
  const [fetchErrors, setFetchErrors] = useState({});
  const [updateErrors, setUpdateErrors] = useState({})

  useEffect(() => {
    const fetch = async () => {
        setFetchStatus('pending');
        setFetchErrors({});
        const resultAction = await dispatch(fetchRole(roleId))
        if (fetchRole.fulfilled.match(resultAction)) {
            setValue(resultAction.payload);
            setFetchStatus('succeeded');
        } else {
            setFetchStatus('failed');
            if (resultAction.payload) {
                setFetchErrors(flattenErrors(resultAction.payload))
            } else {
                setFetchErrors({'non_field_errors': resultAction.error.message})
            }
        }

    }
    fetch();
  }, [dispatch, roleId]);

  const handleSubmit = async ({value}) => {
    console.log(value);
    setUpdateStatus('pending');
    setUpdateErrors({});
    const resultAction = await dispatch(updateRole(value))
    if (updateRole.fulfilled.match(resultAction)) {
      setUpdateStatus('succeeded');
    } else {
      setUpdateStatus('failed')
      if (resultAction.payload) {
        // Request completed successfully but returned field errors
        setUpdateErrors(flattenErrors(resultAction.payload))
      } else {
        // Request failed for unknown reason. Show the message.
        setUpdateErrors({'non_field_errors': resultAction.error.message})
      }
    }
  }

  let content

  if (fetchStatus === 'pending') {
      content = (<Spinner pad="large" size="large" color="status-unknown" />)
  } else if (fetchStatus === 'succeeded') {
      content = (
        <Box pad="medium">
          <Error message={(updateErrors && updateErrors['non_field_errors']) ? updateErrors['non_field_errors'] : undefined} />
          <Form
            id="role-form"
            value={value}
            onChange={ nextValue => setValue(nextValue)}
            onSubmit={handleSubmit}
            errors={updateErrors}
          >
            <FormField label="Name" name="name" required>
              <TextInput name="name" />
            </FormField>
            <SubmitButton label="Save" loadingIndicator={updateStatus === 'pending'}  />
          </Form>
        </Box>
      )
  } else if (fetchStatus === 'failed') {
      content = (<Error message={(fetchErrors && fetchErrors['non_field_errors']) ? fetchErrors['non_field_errors'] : undefined} />)
  }

  return (
    <Page
      title="Role"
      pad="small"
      previous={`/roles/${roleId}`}
      // action={{
      //   icon: <Checkmark />,
      //   type: "submit",
      //   form: "role-form"
      // }}
    >
      {content}
    </Page>
  )

};

export default RoleEdit;
