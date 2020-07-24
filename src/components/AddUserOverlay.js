import { Box, Button, Heading, Layer, Text } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import { connect } from 'react-redux';



const AddUserOverlay = ({  onClose }) => {

  return (
    <Layer
      position="center"
      onClickOutside={onClose}
      onEsc={onClose}
      pad="medium"
      style={{"borderRadius": "0px"}}
    >
      <Box flex={false} width="medium">
        <Box align="start">
          <Button icon={(<Close />)} onClick={onClose} />
        </Box>
        <Box flex overflow="scroll" gap="medium" pad="medium">
          <Heading>Coming soon!</Heading>
          <Text>We're still working on that functionality.</Text>
        </Box>
      </Box>
    </Layer>
  )

};

const mapStateToProps = state => ({
  
})

export default connect(mapStateToProps, {})(AddUserOverlay)
