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
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import * as Sentry from '@sentry/browser';

LogRocket.init('xirvnf/dreamly-gif-projectstaging');
setupLogRocketReact(LogRocket);

Sentry.init({dsn: "https://ce9e6ef674b0409db60c5de68874a568@sentry.io/5171937"});

LogRocket.getSessionURL(sessionURL => {
  Sentry.configureScope(scope => {
    scope.setExtra("sessionURL", sessionURL);
  });
});

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
