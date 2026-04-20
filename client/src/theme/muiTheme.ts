import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#82b1ff',
      contrastText: '#000',
    },
    background: {
      default: '#000000',
      paper: 'rgba(255,255,255,0.06)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.6)',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontWeightBold: 800,
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
        html: { scrollBehavior: 'smooth' },
        body: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: '#fff',
          background: '#000',
          overflowX: 'hidden',
        },
      },
    },
    MuiContainer: {
      defaultProps: { maxWidth: 'xl' },
      styleOverrides: {
        maxWidthXl: {
          maxWidth: '1400px !important',
          paddingLeft: '48px !important',
          paddingRight: '48px !important',
          '@media (max-width: 1100px)': {
            paddingLeft: '40px !important',
            paddingRight: '40px !important',
          },
          '@media (max-width: 768px)': {
            paddingLeft: '20px !important',
            paddingRight: '20px !important',
          },
          '@media (max-width: 480px)': {
            paddingLeft: '18px !important',
            paddingRight: '18px !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textTransform: 'none',
          fontWeight: 800,
          borderRadius: '50px',
        },
      },
    },
  },
})
