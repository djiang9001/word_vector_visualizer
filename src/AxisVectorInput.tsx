import { useRef, useState } from 'react';
import type { FC } from 'react';

import type { WordVector } from './UserInputs';
import { Box, Button, Modal, Paper, TextField, Typography } from '@mui/material';

import type { Vector } from './VectorPlot';
import { getVectorFromWord } from './helpers';

type AxisVectorInputProps = {
  wordVector?: WordVector;
  plotVector?: Vector;
  labelX?: string;
  labelY?: string;
  labelZ?: string;
  axisLabel?: string;
  onDelete: (newWord: string | undefined) => void;
  onUpdate: (newWord: string | undefined) => void;
}

export const AxisVectorInput: FC<AxisVectorInputProps> = ({
  wordVector,
  plotVector,
  labelX,
  labelY,
  labelZ,
  axisLabel,
  onDelete,
  onUpdate,
}) => {

  const fieldRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContents, setModalContents] = useState<string>("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {axisLabel && <Typography>{axisLabel}</Typography>}
        <TextField inputRef={fieldRef} defaultValue={wordVector?.label} sx={{ width: "100%" }}/>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}>
        <Button onClick={() => {
            onUpdate(fieldRef?.current?.value.toLowerCase());
          }}>
            <Typography>
              Update
            </Typography>
        </Button>
        {plotVector && <Typography>
          {plotVector.x} {labelX} {plotVector.y} {labelY} {plotVector.z} {labelZ}
        </Typography>}
        <Button onClick={() => {
          onDelete(wordVector?.label);
          if (fieldRef?.current) {
            fieldRef.current.value = "";
          }
        }}>
            <Typography>
              Clear
            </Typography>
        </Button>
        <Button onClick={async () => {
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
            // padding: 4,
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
    </Box>
  );
}
