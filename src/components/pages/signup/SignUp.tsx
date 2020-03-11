import React from "react";
import SignUpForm from "./SignUpForm";
import styled, { css } from "styled-components";

interface Props {}

const HeadLine = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.size.font.huge};
    font-weight: lighter;
  `
);

const Spacer = styled.div(
  () => css`
    height: 3em;
  `
);

const SignUp = (props: Props) => {
  return (
    <div>
      <Spacer />
      <HeadLine>Sign up</HeadLine>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
