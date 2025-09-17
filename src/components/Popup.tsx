import type { FC } from 'react';

import type { ModalProps } from '@mui/material';
import { Modal, Paper, Box } from '@mui/material';

export const Popup: FC<ModalProps> = (props: ModalProps) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <Modal {...restProps}>
      <Paper sx={{
          display: "flex",
          border: "none",
          height: "75vh",
          width: "75vw",
          position: "absolute",
          margin: "auto",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
      }}>
        <Box sx={{ padding: 4, overflow: "auto" }}>
          {children}
        </Box>
      </Paper>
    </Modal>
  );
}