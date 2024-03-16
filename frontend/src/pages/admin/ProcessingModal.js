// ProcessingModal.js

import React from 'react';
import { CircularProgress, Modal, Backdrop, Box, Typography } from '@mui/material';

const ProcessingModal = () => {
  return (
    <Modal
      open={true} // Show modal when loading is true
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" color="primary" sx={{ ml: 2 }}>Processing...</Typography>
      </Box>
    </Modal>
  );
};

export default ProcessingModal;
