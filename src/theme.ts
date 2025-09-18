import { createTheme } from '@mui/material/styles';

export function setupTheme() {

  return createTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#404040',
            contrastText: '#d0d0d0',
          },
          secondary: {
            main: '#808080',
            contrastText: '#f0f0f0',
          },
          background: {
            default: '#f0f0f0',
            paper: '#ffffff',
          },
          text: {
            primary: '#404040',
            secondary: '#404040b3',
            disabled: '#40404080',
          }
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#d0d0d0',
            contrastText: '#404040',
          },
          secondary: {
            main: '#b0b0b0',
            contrastText: '#202020',
          },
          background: {
            default: '#202020',
            paper: '#303030',
          },
          text: {
            primary: '#d0d0d0',
            secondary: '#d0d0d0b3',
            disabled: '#d0d0d080',
          }
        },
      },
    },
    typography: {
      fontFamily: "'Old Standard TT', serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
          outlined: ({ theme }) => ({
            backgroundColor: theme.palette.background.default,
          }),
        },
        defaultProps: {
          variant: "outlined",
          disableElevation: true,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            top: "50%",
            marginTop: "calc(-24px / 2 - 9px)",
          }
        },
      },
    },
  });
}
