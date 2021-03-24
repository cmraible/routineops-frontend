import { Box, Text } from 'grommet';
import { Logout } from 'grommet-icons';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Description from '../../components/Description';
import EditDescription from '../../components/EditDescription';
import { selectLoggedInUser } from '../auth/authSlice';
import ChangePasswordModal from './AccountChangePassword';
import PhoneNumberModal from './AccountPhoneNumber';
import EditNameModal from './AccountProfileName';
import { logout } from '../auth/authSlice';
import { push } from 'connected-react-router';


const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const AccountProfile = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  const [phone, setPhone] = useState(false);
  const [password, setPassword] = useState(false);
  const [name, setName] = useState(false);


  let phonenumber
  if (user.phonenumber) {
    phonenumber = phoneUtil.format(phoneUtil.parse(user.phonenumber.number, 'US'), PNF.INTERNATIONAL)
  } else {
    phonenumber = ''
  }


  return (
    <>
      <Box width="large" pad="medium" fill="vertical">
        <Description
          title="Email Address"
          description={user.email}
        />
        <EditDescription
          title="Name"
          description={user.first_name + " " + user.last_name}
          onClick={() => setName(true)}
        />
        <EditDescription
          title="Mobile Phone"
          verifiable={user.phonenumber}
          verified={user.phonenumber ? user.phonenumber.verified : ''}
          description={phonenumber}
          onClick={() => setPhone(true)}
          dataCY="change-phone"
        />
        <EditDescription title="Password" description={user.password_bool ? "Change Password" : "Set Password"} onClick={() => setPassword(true)}/>
        <Box fill="vertical" margin={{right: "medium", top: "xlarge"}} align="end" justify="end">
          <Box
            hoverIndicator
            round="small"
            direction="row"
            gap="medium"
            align="center"
            pad="small"
            onClick={() => {
              dispatch(push('/'));
              dispatch(logout());
            }}
          >
            <Logout /><Text>Logout</Text>
          </Box>
        </Box>
      </Box>
      {(password && <ChangePasswordModal close={() => setPassword(false)} />)}
      {(phone && <PhoneNumberModal close={() => setPhone(false)} />)}
      {(name && <EditNameModal close={() => setName(false)} />)}
    </>
  )
};

export default AccountProfile;
