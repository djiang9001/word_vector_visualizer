import type { FC } from 'react';
import { useRef } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

type NewVectorInputProps = {
  onUpdate: (newWord: string | undefined) => void;
};

export const NewVectorInput: FC<NewVectorInputProps> = ({ onUpdate }) => {

  const fieldRef = useRef<HTMLInputElement>(null);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TextField inputRef={fieldRef} sx={{ width: 150 }}/>
      <Button sx={{}} onClick={() => {
          onUpdate(fieldRef?.current?.value.toLowerCase());
          if (fieldRef?.current) {
            fieldRef.current.value = "";
          }
        }}>
          <Typography>
            Add
          </Typography>
      </Button>
    </Box>
  );

}
