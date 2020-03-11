import React from "react";
import Routes from "./routes/Routes";
import styled, { css } from "styled-components";

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
      <Routes />
    </RootWrapper>
  );
}

export default App;
