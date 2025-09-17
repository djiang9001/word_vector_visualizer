import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import { Box, Grid, IconButton, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import { AxisVectorInput } from '@app/components/AxisVectorInput';
import { DarkModeSwitch } from '@app/components/DarkModeSwitch';
import { NewVectorInput } from '@app/components/NewVectorInput';
import { Popup } from '@app/components/Popup';
import { UserVectorInput } from '@app/components/UserVectorInput';

import type { Vector } from '@app/pages/home/VectorPlot';
import { HelpContent } from '@app/pages/home/HelpContent';

export type WordVector = {
  label: string;
  vector: number[];
} | undefined;

type UserInputsProp = {
  wordVectorX?: WordVector;
  wordVectorY?: WordVector;
  wordVectorZ?: WordVector;
  userWordVectors?: Map<string, WordVector>;
  plotVectors?: Vector[];
  updateWordVectorX: (newWord: string | undefined) => void
  updateWordVectorY: (newWord: string | undefined) => void
  updateWordVectorZ: (newWord: string | undefined) => void
  addUserWordVector: (newWord: string | undefined) => void
  deleteUserWordVector: (newWord: string | undefined) => void
};

export const UserInputs: FC<UserInputsProp> = ({
  wordVectorX,
  wordVectorY,
  wordVectorZ,
  userWordVectors = [],
  plotVectors = [],
  updateWordVectorX,
  updateWordVectorY,
  updateWordVectorZ,
  addUserWordVector,
  deleteUserWordVector,
}) => {

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const userWordVectorComponents: ReactNode[] = [];
  var index = 0;
  userWordVectors.forEach((wordVector, _key) => {
    userWordVectorComponents.push(
      <Grid key={wordVector?.label ?? ""} size={12}>
        <UserVectorInput key={wordVector?.label ?? ""} wordVector={wordVector} plotVector={plotVectors[index]}
          labelX={wordVectorX?.label} labelY={wordVectorY?.label} labelZ={wordVectorZ?.label}
          onDelete={(newWord) => deleteUserWordVector(newWord) }/>
      </Grid>);
      index++;
    }
  );

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid size={6} sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Axis Vectors</Typography>
        </Grid>
        <Grid size={6}>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <IconButton onClick={() => {
              setModalOpen(true);
            }}>
              <HelpIcon color="primary"/>
            </IconButton>
            <DarkModeSwitch/>
          </Box>
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }} size={12}>
          <AxisVectorInput wordVector={wordVectorX} onDelete={() => updateWordVectorX(undefined)} onUpdate={updateWordVectorX} axisLabel={"X"}/>
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }} size={12}>
          <AxisVectorInput wordVector={wordVectorY} onDelete={() => updateWordVectorY(undefined)} onUpdate={updateWordVectorY} axisLabel={"Y"}/>
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }} size={12}>
          <AxisVectorInput wordVector={wordVectorZ} onDelete={() => updateWordVectorZ(undefined)} onUpdate={updateWordVectorZ} axisLabel={"Z"}/>
        </Grid>
        <Grid size={12}>
          <Typography>Plot Vectors</Typography>
        </Grid>
        {userWordVectorComponents}
        <Grid size={12}>
          <NewVectorInput onUpdate={(newWord) => addUserWordVector(newWord)}/>
        </Grid>
      </Grid>
      <Popup
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <HelpContent/>
      </Popup>
    </Box>
  );

}
