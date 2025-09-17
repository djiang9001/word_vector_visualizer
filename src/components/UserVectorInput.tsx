import type { FC } from 'react';
import { useRef, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { Popup } from '@app/components/Popup';

import type { Vector } from '@app/pages/home/VectorPlot';
import type { WordVector } from '@app/pages/home/UserInputs';

import { getVectorFromWord } from '@app/helpers/helpers';

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
      <Button onClick={() => { onDelete(wordVector?.label); }}>
        <Typography>
          Delete
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
  </>);

}
