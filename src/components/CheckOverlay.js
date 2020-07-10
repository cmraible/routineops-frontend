import { Box, Button, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import React from 'react';
import CheckForm from './CheckForm';

const CheckOverlay = ({ organization, check, onClose, onDelete, onSave }) => {

  const onSubmit = (value) => {
    onSave(value)
    onClose()
  }

  const onDeleteCheck = () => {
    onDelete(check.id)
    onClose()
  }

  return (
    <Layer 
      background="background" 
      position="center" 
      onClickOutside={onClose} 
      onEsc={onClose}
    >
      <Box align="end" width="large">
       <Button icon={(<Close />)} onClick={onClose} />
      </Box>
      <CheckForm organization={organization} check={check} onSubmit={onSubmit} onDelete={onDeleteCheck}/>
    </Layer>
  )

};

export default CheckOverlay;
