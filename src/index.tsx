import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./css/index.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { rrfProps } from "./config/fbConfig";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
