import React from "react";
import Routes from "./routes/Routes";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

function AuthIsLoaded({ children }: { children: any }) {
  const state = useSelector((state: any) => state);
  const auth = state.firebase.auth;
  if (!isLoaded(auth)) return <div />;
  return children;
}

const RootWrapper = styled.div(
  ({ theme }) => css`
    text-align: center;
    margin: auto;
    max-width: ${theme.range.screen.maxWidth};
  `
);

function App() {
  return (
    <RootWrapper>
      <AuthIsLoaded>
        <Routes />
      </AuthIsLoaded>
    </RootWrapper>
  );
}

export default App;
