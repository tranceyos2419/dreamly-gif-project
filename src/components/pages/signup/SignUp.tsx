import React, { useEffect } from "react";
import SignUpForm from "./SignUpForm";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const history = useHistory();
  const state = useSelector((state): any => state);
  const auth = state.firebase.auth;
  const isEmpty = auth.isEmpty;

  //todo auth checker
  useEffect(() => {
    !isEmpty && history.push("/feed");
  }, isEmpty);

  return (
    <div>
      <Spacer />
      <HeadLine>Sign up</HeadLine>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
