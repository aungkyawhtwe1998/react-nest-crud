import { useState } from "react";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { ThemeProvider, createTheme } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
  palette: {
    primary: {
      main: "#52796f",
    },
    secondary: {
      main: "#84a98c",
    },
    success: {
      main: "#a3b18a",
    },
    error: {
      main: "#cad2c5",
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
          {/* <PersistGate
            loading={null}
            persistor={persistor}>
            
          </PersistGate> */}
          <ThemeProvider theme={theme}>
            <ProSidebarProvider>
              <Router>
                <Routes />
              </Router>
            </ProSidebarProvider>
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
