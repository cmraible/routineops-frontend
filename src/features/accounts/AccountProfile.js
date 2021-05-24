import { Box, Card, CardBody, CardHeader, Heading } from 'grommet';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Description from '../../components/Description';
import EditDescription from '../../components/EditDescription';
import { selectLoggedInUser } from '../auth/authSlice';
import ChangePasswordModal from './AccountChangePassword';
import PhoneNumberModal from './AccountPhoneNumber';
import EditNameModal from './AccountProfileName';
import AccountTimezone from './AccountTimezone';
import AccountMorningSummary from './AccountMorningSummary';
import AccountEveningSummary from './AccountEveningSummary';
import { formatTime } from '../../utils';

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const AccountProfile = () => {

  const user = useSelector(selectLoggedInUser)

  // Show / hide the phone number modal
  const [phone, setPhone] = useState(false);
  // Show / hide the password modal
  const [password, setPassword] = useState(false);
  // Show / hide the name modal
  const [name, setName] = useState(false);
  // Show / hide the timezone modal
  const [timezone, setTimezone] = useState(false);
  // Show / hide the morning summary modal
  const [morningSummary, setMorningSummary] = useState(false);
  // Show / hide the evening summary modal
  const [eveningSummary, setEveningSummary] = useState(false);


  let phonenumber
  if (user.phonenumber) {
    phonenumber = phoneUtil.format(phoneUtil.parse(user.phonenumber.number, 'US'), PNF.INTERNATIONAL)
  } else {
    phonenumber = ''
  }


  return (
    <>
      <Box pad="medium" gap="medium" flex={false}>
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">Contact Info</Heading>
          </CardHeader>
          <CardBody flex={false} pad="small" background="background-contrast">
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
          </CardBody>
        </Card>
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">Security</Heading>
          </CardHeader>
          <CardBody pad="small" background="background-contrast">
            <EditDescription title="Password" description={user.password_bool ? "Change Password" : "Set Password"} onClick={() => setPassword(true)}/>
          </CardBody>
        </Card>
        <Card elevation="none" border="border">
          <CardHeader pad="small">
            <Heading level={3} margin="none">Notifications</Heading>
          </CardHeader>
          <CardBody pad="small" background="background-contrast">
            <EditDescription 
                title="Timezone"
                description={user.timezone}
                onClick={() => setTimezone(true)}
            />
            <EditDescription
              title="Morning Summary"
              description={user.send_morning_summary ? formatTime(user.send_morning_summary) : ''}
              onClick={() => setMorningSummary(true)}
            />
            <EditDescription
              title="Evening Summary"
              description={user.send_evening_summary ? formatTime(user.send_evening_summary) : ''}
              onClick={() => setEveningSummary(true)}
            />

          </CardBody>
        </Card>
      </Box>
      {(password && <ChangePasswordModal close={() => setPassword(false)} />)}
      {(phone && <PhoneNumberModal close={() => setPhone(false)} />)}
      {(name && <EditNameModal close={() => setName(false)} />)}
      {(timezone && <AccountTimezone close={() => setTimezone(false)} />)}
      {(morningSummary && <AccountMorningSummary close={() => setMorningSummary(false)} />)}
      {(eveningSummary && <AccountEveningSummary close={() => setEveningSummary(false)} />)}

    </>
  )
};

export default AccountProfile;
