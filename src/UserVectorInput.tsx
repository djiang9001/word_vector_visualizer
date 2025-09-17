import { useRef, useState } from 'react';
import type { FC } from 'react';

import type { WordVector } from './UserInputs';
import { Box, Button, Modal, Paper, TextField, Typography } from '@mui/material';

import type { Vector } from './VectorPlot';
import { getVectorFromWord } from './helpers';

type UserVectorInputProps = {
  wordVector: WordVector;
  plotVector: Vector;
  labelX?: string;
  labelY?: string;
  labelZ?: string
  onDelete: (newWord: string | undefined) => void;
}

export const UserVectorInput: FC<UserVectorInputProps> = ({
  wordVector,
  plotVector,
  labelX,
  labelY,
  labelZ,
  onDelete,
}) => {

  const fieldRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContents, setModalContents] = useState<string>("");

  return (<>
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <TextField inputRef={fieldRef} value={wordVector?.label}/>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography>
            {plotVector.x.toFixed(15)}
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap", textAlign: "right" }}>
            {labelX}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography>
            {plotVector.y.toFixed(15)}
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap", textAlign: "right" }}>
            {labelY}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography>
            {plotVector.z.toFixed(15)}
          </Typography>
          <Typography sx={{ whiteSpace: "nowrap", textAlign: "right" }}>
            {labelZ}
          </Typography>
        </Box>
      </Box>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}>
      <Button variant="outlined" onClick={() => { onDelete(wordVector?.label); }}>
        <Typography>
          Delete
        </Typography>
      </Button>
      <Button variant="outlined" onClick={async () => {
        const wordVectorRaw = await getVectorFromWord(wordVector?.label ?? "");
        setModalContents((wordVector?.label ?? "") + " " + wordVectorRaw.join(" "));
        setModalOpen(true);
      }}>
        <Typography>
          View Raw Vector
        </Typography>
      </Button>

    </Box>
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
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
          <Typography>
            {modalContents}
          </Typography>
        </Box>
      </Paper>
    </Modal>
  </>);

}
