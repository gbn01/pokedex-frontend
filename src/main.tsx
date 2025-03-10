import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router'
import { ThemeProvider, createTheme, THEME_ID } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{ [THEME_ID]: theme }}>
      <Router />
    </ThemeProvider>
  </StrictMode>,
)
