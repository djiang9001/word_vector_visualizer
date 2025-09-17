import type { FC } from 'react';
import { useRef, useState } from 'react';

import type { WordVector } from '@app/pages/home/UserInputs';
import { Box, Button, TextField, Typography } from '@mui/material';

import { Popup } from '@app/components/Popup';

import type { Vector } from '@app/pages/home/VectorPlot';

import { getVectorFromWord } from '@app/helpers/helpers';

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
      <Popup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Typography>
          {modalContents}
        </Typography>
      </Popup>
    </Box>
  );
}
