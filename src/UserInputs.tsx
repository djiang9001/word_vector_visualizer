import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import { Box, Grid, IconButton, Modal, Paper, Switch, Typography } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

import { AxisVectorInput } from './AxisVectorInput';
import { NewVectorInput } from './NewVectorInput';
import { UserVectorInput } from './UserVectorInput';
import type { Vector } from './VectorPlot';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import HelpIcon from '@mui/icons-material/Help';
import { HelpContent } from './HelpContent';

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

  const { mode, systemMode, setMode } = useColorScheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const userWordVectorComponents: ReactNode[] = [];
  var index = 0;
  userWordVectors.forEach((wordVector, _key) => {
    userWordVectorComponents.push(
      <Grid size={12}>
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
            <Switch checked={actualMode === "dark"} icon={<LightModeIcon color="primary"/>} checkedIcon={<DarkModeIcon color="primary"/>}
              onClick={() => {
                if (actualMode === "dark") {
                  setMode("light");
                } else {
                  setMode("dark");
                }
            }}/>
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
            <HelpContent/>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );

}
