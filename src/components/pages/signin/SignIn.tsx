import React from "react";
import { useToFeedIfAuthenticated } from "../../hooks/myCustomHooks";
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
  useToFeedIfAuthenticated();
  return (
    <>
      <Spacer />
      <HeadLine>Sign In</HeadLine>
      <SignInForm />
    </>
  );
};

export default SignIn;
