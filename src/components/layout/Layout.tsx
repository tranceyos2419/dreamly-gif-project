import React from "react";
import Navbar from "./Navbar";
import styled, { css } from "styled-components";

interface Props {}

const Border = styled.div(
  ({ theme }) => css`
    height: 3px;
    background-color: ${theme.color.underLine.primary};
  `
);
const Layout: React.FC<Props> = props => {
  return (
    <>
      <Navbar />
      <Border />
      {props.children}
    </>
  );
};

export default Layout;
