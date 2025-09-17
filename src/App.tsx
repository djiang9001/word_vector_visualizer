import { useState } from 'react';

import { Container, CssBaseline, Grid, ThemeProvider } from '@mui/material';

import { VectorPlot } from './VectorPlot';
import { UserInputs, type WordVector } from './UserInputs';
import { getPlotVectorsFromWordVectors, getVectorFromWord } from './helpers';
import { setupTheme } from './theme.ts';
import '@fontsource/old-standard-tt';

function App() {

  const theme = setupTheme();

  const [wordVectorX, setWordVectorX] = useState<WordVector>(undefined);
  const [wordVectorY, setWordVectorY] = useState<WordVector>(undefined);
  const [wordVectorZ, setWordVectorZ] = useState<WordVector>(undefined);
  const [userWordVectors, setUserWordVectors] = useState<Map<string, WordVector>>(new Map<string, WordVector>());

  const vectors = getPlotVectorsFromWordVectors(wordVectorX, wordVectorY, wordVectorZ, userWordVectors);

  const updateWordVectorX = async (newWord: string | undefined) => {
    if (newWord === undefined) {
      setWordVectorX(undefined);
      return;
    }

    const newWordVector = await getVectorFromWord(newWord);
    if (newWordVector.length == 0) {
      console.log(`Could not find word vector for word "${newWord}"`);
      alert(`Could not find word vector for word "${newWord}"`);
      return;
    }

    setWordVectorX({
      label: newWord,
      vector: newWordVector,
    });
  }

  const updateWordVectorY = async (newWord: string | undefined) => {
    if (newWord === undefined) {
      setWordVectorY(undefined);
      return;
    }

    const newWordVector = await getVectorFromWord(newWord);
    if (newWordVector.length == 0) {
      console.log(`Could not find word vector for word "${newWord}"`);
      alert(`Could not find word vector for word "${newWord}"`);
      return;
    }

    setWordVectorY({
      label: newWord,
      vector: newWordVector,
    });
  }

  const updateWordVectorZ = async (newWord: string | undefined) => {
    if (newWord === undefined) {
      setWordVectorZ(undefined);
      return;
    }

    const newWordVector = await getVectorFromWord(newWord);
    if (newWordVector.length == 0) {
      console.log(`Could not find word vector for word "${newWord}"`);
      alert(`Could not find word vector for word "${newWord}"`);
      return;
    }

    setWordVectorZ({
      label: newWord,
      vector: newWordVector,
    });
  }

  const addUserWordVector = async (newUserWord: string | undefined) => {
    if (newUserWord === undefined) {
      return;
    }
    if (userWordVectors.has(newUserWord)) {
      console.log(`Word "${newUserWord}" already added`);
      alert(`Word "${newUserWord}" already added`);
      return;
    }
    const newWordVector = await getVectorFromWord(newUserWord);
    if (newWordVector.length == 0) {
      console.log(`Could not find word vector for word "${newUserWord}"`);
      alert(`Could not find word vector for word "${newUserWord}"`);
      return;
    }

    const newMap = new Map<string, WordVector>(userWordVectors);
    newMap.set(newUserWord, {
      label: newUserWord,
      vector: newWordVector,
    });
    setUserWordVectors(newMap);
  }

    const deleteUserWordVector = async (newUserWord: string | undefined) => {
    if (newUserWord === undefined) {
      return;
    }
    if (!userWordVectors.has(newUserWord)) {
      console.log(`Word "${newUserWord}" can't be deleted as it doesn't exist`);
      alert(`Word "${newUserWord}" can't be deleted as it doesn't exist`);
      return;
    }
    const newMap = new Map<string, WordVector>(userWordVectors);
    newMap.delete(newUserWord);
    setUserWordVectors(newMap);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh", width: "100vw", m: 0, padding: 0 }}>
        <Grid container spacing={2} sx={{ p: 2, height: "100%", width: "100%" }}>
          <Grid size={8} sx={{ height: "100%", display: "flex" }}>
            <VectorPlot labelX={wordVectorX?.label} labelY={wordVectorY?.label} labelZ={wordVectorZ?.label} vectors={vectors}/>
          </Grid>
          <Grid size={4} sx={{ height: "100%", display: "flex", overflowY: "auto" }}>
            <UserInputs wordVectorX={wordVectorX} wordVectorY={wordVectorY} wordVectorZ={wordVectorZ} userWordVectors={userWordVectors} plotVectors={vectors}
              updateWordVectorX={updateWordVectorX} updateWordVectorY={updateWordVectorY} updateWordVectorZ={updateWordVectorZ}
              addUserWordVector={addUserWordVector} deleteUserWordVector={deleteUserWordVector}/>
          </Grid>
        </Grid>
      </Container>
    
    </ThemeProvider>
  )
}

export default App
