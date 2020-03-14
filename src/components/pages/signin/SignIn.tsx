import React from "react";
import { useToHomeIfAuthenticated } from "../../hooks/myCustomHooks";
import styled, { css } from "styled-components";
import SignInForm from "./SignInForm";

interface Props {}

const HeadLine = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.size.font.huge};
    font-weight: lighter;
  `
);

const Spacer = styled.div(
  () => css`
    height: 4em;
  `
);

const SignIn = (props: Props) => {
  useToHomeIfAuthenticated();
  return (
    <>
      <Spacer />
      <HeadLine>Sign In</HeadLine>
      <SignInForm />
    </>
  );
};

export default SignIn;
