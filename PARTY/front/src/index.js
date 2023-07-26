import React from "react";
import {createRoot} from 'react-dom/client'
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./redux/store";
import { App } from "./components/mainComponents/App";
import { theme } from '../src/components/theme/theme'

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

