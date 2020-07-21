import { Box, Button, Form, FormField, Heading, Layer, TextInput } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';



const AddUserOverlay = ({  onClose }) => {

  return (
    <Layer
      position="right"
      onClickOutside={onClose}
      onEsc={onClose}
      pad="medium"
      full="vertical"
      style={{"borderRadius": "0px"}}
    >
      <Box flex={false} width="medium">
        <Box align="start">
          <Button icon={(<Close />)} onClick={onClose} />
        </Box>
        <Box flex overflow="scroll" gap="medium" pad="medium">
          <Heading>Add users</Heading>
          <Form>
            <FormField label="Email Address">
              <TextInput />
            </FormField>
            <Button type="submit" primary label="Add users" />
          </Form>
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps, {})(AddUserOverlay)
