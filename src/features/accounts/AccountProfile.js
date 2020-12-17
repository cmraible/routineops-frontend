import { Box } from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Description from '../../components/Description';
import EditDescription from '../../components/EditDescription';
import { selectLoggedInUser } from '../auth/authSlice';
import ChangePassword from '../auth/ChangePassword';
import PhoneNumberModal from '../../components/PhoneNumberModal';
import AccountProfileName from './AccountProfileName';

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const AccountProfile = () => {

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

      <Box width="large" pad="medium">
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
        />
        <EditDescription title="Password" description={user.password_bool ? "Change Password" : "Set Password"} onClick={() => setPassword(true)}/>
      </Box>
      {(password && <ChangePassword close={() => setPassword(false)} />)}
      {(phone && <PhoneNumberModal close={() => setPhone(false)} />)}
      {(name && <AccountProfileName close={() => setName(false)} />)}
    </>
  )
};

export default AccountProfile;
