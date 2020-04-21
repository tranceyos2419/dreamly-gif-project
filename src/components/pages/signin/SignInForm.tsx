import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../../global/ErrorMessage";
import {
  StyledForm,
  StyledInput,
  SubmitWrapper,
  SubmitInput,
  ErrorMessageWrapper
} from "../../../styles/authForm";

interface Props {}

const SignInForm = (props: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const firebase = useFirebase();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push("/home");
    } catch (error) {
      alert("failed to sign in");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder="e-mail"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        error={errors.email ? true : false}
      />
      <ErrorMessageWrapper>
        <ErrorMessage error={errors.email} errorName="E-mail" />
      </ErrorMessageWrapper>
      <StyledInput
        type="password"
        name="password"
        placeholder="password"
        ref={register({ required: true, min: 5, maxLength: 30 })}
        error={errors.password ? true : false}
      />
      <ErrorMessageWrapper>
        <ErrorMessage error={errors.password} errorName="Password" />
      </ErrorMessageWrapper>
      <SubmitWrapper>
        <SubmitInput type="submit" />
      </SubmitWrapper>
    </StyledForm>
  );
};

export default SignInForm;
