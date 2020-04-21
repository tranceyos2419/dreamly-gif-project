import React, { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import styled, { css } from "styled-components";
import { useToHomeIfAuthenticated } from "../../hooks/myCustomHooks";
import Spacer from "../../global/Spacer";

interface Props {}

const HeadLine = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.size.font.huge};
    font-weight: lighter;
  `
);

const SignUp = (props: Props) => {
  useToHomeIfAuthenticated();
  return (
    <div>
      <Spacer height="3em" />
      <HeadLine>Sign up</HeadLine>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
