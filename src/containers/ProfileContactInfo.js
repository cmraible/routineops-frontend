import { Box, Button, Heading, Text } from 'grommet';
import { Alert, Checkmark, Edit } from 'grommet-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { saveUser, updateUserPhone, verifyUserPhone } from '../actions/user.actions';
import { getAllRoles, getLoggedInUser } from '../reducers/reducers';
import PhoneNumberModal from '../components/PhoneNumberModal';
import VerifyPhoneNumberModal from '../components/VerifyPhoneNumberModal';




const ProfileContactInfo = ({ saveUser, user, updateUserPhone, verifyUserPhone }) => {

  const [editPhone, setEditPhone] = useState(false);
  const [verifyPhone, setVerifyPhone] = useState(false);

  const handleSavePhone = (value) => {
    console.log(value);
    updateUserPhone(user, value);
    setEditPhone(false);
    setVerifyPhone(value);
  }

  const handleVerifyPhone = (value) => {
    console.log(value);
    verifyUserPhone(user, value.to, value.check);
  }

  const phoneVerified = user.phonenumber && user.phonenumber.verified ?
    (<Button icon={<Checkmark size="small"/>} primary color="status-ok" round="full" disabled />) :
    (<Button icon={<Alert size="small"/>} primary color="status-warning" round="full" />)

  return (
    <Box gap="medium">
      <Heading margin="none" level={2}>Contact Info</Heading>
      <Box direction="row" align="center" justify="between">
        <Text>Name:</Text>
        <Text weight="bold">{user.first_name} {user.last_name}</Text>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Email:</Text>
        <Box direction="row" align="center" gap="small">
          <Button icon={<Edit />} hoverIndicator />
          <Text weight="bold">{user.email}</Text>
        </Box>
      </Box>
      <Box direction="row" align="center" justify="between">
        <Text>Mobile Phone:</Text>
        <Box direction="row" align="center" gap="small">
          <Button icon={<Edit />} hoverIndicator onClick={() => setEditPhone(true)} />
          {user.phonenumber && <Text weight="bold">{user.phonenumber.number}</Text>}
          {user.phonenumber && phoneVerified }
        </Box>
      </Box>

      {editPhone && <PhoneNumberModal initialValue={(user.phonenumber) ? user.phonenumber.number : ''} onSave={handleSavePhone} onClose={() => setEditPhone(false)} />}
      {verifyPhone && <VerifyPhoneNumberModal phoneNumber={verifyPhone} onSave={handleVerifyPhone} onClose={() => setVerifyPhone(false)} />}

    </Box>
  )
};

const mapStateToProps = state => ({
  user: getLoggedInUser(state),
  roles: getAllRoles(state),
  isFetching: state.user.isFetching,
  errors: state.user.errors,
  darkMode: state.ui.darkMode
});

export default connect(mapStateToProps, {
  saveUser,
  updateUserPhone,
  verifyUserPhone
})(ProfileContactInfo);
