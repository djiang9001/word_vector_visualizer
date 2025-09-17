import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { HomePage } from '@app/pages/home/HomePage';
import { setupTheme } from './theme.ts';
import '@fontsource/old-standard-tt';

function App() {

  const theme = setupTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh", width: "100vw", m: 0, padding: 0 }}>
        <HomePage/>
      </Container>
    </ThemeProvider>
  )
}

export default App
