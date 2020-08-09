import { Box, Button, Form, Heading, Layer, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import EmailField from '../components/EmailField';
import { addInvitation } from '../actions/invitation.actions';
import { connect } from 'react-redux';
import { getLoggedInUser } from '../reducers/reducers';



const AddUserOverlay = ({  onClose, addInvitation, organization, user }) => {


  const handleSubmit = ({value}) => {
    const emails = [value.email1, value.email2, value.email3, value.email4]
    emails.forEach((email) => {
      if (email) {
        const invitation_data = {
          organization: organization.id,
          sender: user.id,
          email_address: email
        };
        addInvitation(invitation_data);
        onClose();
      }
    });
  }

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      style={{"borderRadius": "0px"}}
    >
      <Box flex={false} width="large" pad="medium">
        <Box style={{position: "absolute", "right": 0, top:"0"}}>
          <Button icon={(<Close />)} onClick={onClose} />
        </Box>
        <Box align="center" fill="horizontal">
          <Heading>Invite your team</Heading>
          <Paragraph margin="small">You can invite anyone to join your team by filling out the form below with their email address.</Paragraph>
          <Paragraph margin="small">They will receive an invite in their email with a link to signup right away.</Paragraph>
        </Box>
        <Box fill="horizontal" flex={false} pad="medium">
          <Form
            validate="blur"
            fill="horizontal"
            onSubmit={handleSubmit}
          >
              <EmailField fill="horizontal" name="email1" isRequired={true} />
              <EmailField fill="horizontal" name="email2" isRequired={false} />
              <EmailField fill="horizontal" name="email3" isRequired={false} />
              <EmailField fill="horizontal" name="email4" isRequired={false} />
              <Button type="submit" label="Send Invitations" fill="horizontal" />
          </Form>
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  organization: state.organization.organization,
  user: getLoggedInUser(state)
})

export default connect(mapStateToProps, { addInvitation })(AddUserOverlay)
