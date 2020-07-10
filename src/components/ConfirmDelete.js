import { Box, Button, Heading, Layer, Text } from 'grommet';
import { Close, Trash } from 'grommet-icons';
import React from 'react';


const ConfirmDelete = ({ onClick, onClose, message }) => {


  return (
    <Layer position="center" modal={true}>
      <Box align="end">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <Box pad="medium" gap="medium">
        <Heading>Are you sure?</Heading>
        <Text>{message}</Text>
        <Box direction="row" justify="between">
          <Button label="Cancel" onClick={onClose} />
          <Button icon={<Trash />} primary onClick={onClick} label="Permanently Delete" color="status-critical" />
        </Box>
      </Box>
    </Layer>
        
  )

};

export default ConfirmDelete
