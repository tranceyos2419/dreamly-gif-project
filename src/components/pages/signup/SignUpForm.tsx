import React from "react";
import styled, { css } from "styled-components";
import { GetErrorMessage, getCurrentDate } from "../../../helpers/helpers";
import { useForm } from "react-hook-form";
import {
  useFirebase,
  useFirestore,
} from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { IError, IInput } from "../../../@types/types";
import ErrorMessage from "../../global/ErrorMessage";
interface Props {}

const StyledForm = styled.form(
  () => css`
    padding: 0em 0.5em;
    margin: auto;
  `
);

const StyledInput = styled.input<IError>(
  ({ theme, error }) => css`
    padding: 1em 0.2em;
    margin-top: 3em;
    margin-bottom: 1em;
    width: 50%;
    box-sizing: border-box;
    background: transparent;
    border: none;
    border-bottom: ${error
      ? `1.5px solid ${theme.color.font.error} `
      : `1.5px solid ${theme.color.font.primary}`};
    color: ${theme.color.font.primary};
    ::placeholder {
      color: ${theme.color.font.primary};
    }
    ::-webkit-input-placeholder {
      color: ${theme.color.font.primary};
    }
    &:focus {
      outline: none !important;
      border-color: ${theme.color.font.accent};
    }
  `
);

const SubmitWrapper = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    width: 50%;
    border: 1px sold red;
    margin: auto;
    margin-top: 0.5em;
  `
);

const SubmitInput = styled.input(
  ({ theme }) => css`
    padding: 0.4em 1.5em;
    background: transparent;
    border: 1px solid ${theme.color.font.primary};
    font-size: ${theme.size.font.small};
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.button.background};
    }
  `
);

const ErrorMessageWrapper = styled.div(
  ({ theme }) => css`
    margin: auto;
    display: flex;
    justify-content: flex-start;
    width: 50%;
  `
);

const SignUpForm = (props: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const history = useHistory();

  const onSubmit = async (data: any) => {
    const { name, email, password } = data;
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const uid = res.user?.uid;
      const doc = {
        name,
        email,
        created_at: getCurrentDate()
      };

      await firestore
        .collection("users")
        .doc(uid)
        .set(doc);

      history.push("/home");
    } catch (error) {
      alert("failed to sign up");
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="text"
          placeholder="username"
          name="name"
          ref={register({ required: true, min: 5, maxLength: 50 })}
          error={errors.name ? true : false}
        />
        <ErrorMessageWrapper>
          <ErrorMessage error={errors.name} errorName={"Name"} />
        </ErrorMessageWrapper>
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
    </>
  );
};

export default SignUpForm;
