import React from "react";
import { useToHomeIfAuthenticated } from "../../hooks/myCustomHooks";
import styled, { css } from "styled-components";
import SignInForm from "./SignInForm";
import Spacer from "../../global/Spacer";

interface Props {}

const HeadLine = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.size.font.huge};
    font-weight: lighter;
  `
);

const SignIn = (props: Props) => {
  useToHomeIfAuthenticated();
  return (
    <>
    <Spacer height="4em" />
      <HeadLine>Sign In</HeadLine>
      <SignInForm />
    </>
  );
};

export default SignIn;
