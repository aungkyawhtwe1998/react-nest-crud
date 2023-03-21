import { useState } from 'react'

import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './lib/store';
import { ThemeProvider, createTheme } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#fe0005",
    },
    secondary: {
      main: "#0044ff",
    },
    success: {
      main: "#00FF7F",
    },
    error: {
      main: "#fff",
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});
function App() {


  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme ={ theme }>
            <Router>
              <Routes/>
            </Router>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
      
    </div>
  )
}

export default App
