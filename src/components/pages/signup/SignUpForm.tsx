import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { GetErrorMessage } from "../../../helpers/helpers";
import { useForm } from "react-hook-form";
import { useFirebase, useFirestore } from "react-redux-firebase";

interface Props {}

interface IError {
  error: boolean | undefined;
}

export interface IInput {
  type: string;
}

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

const ErrorMessage = styled.div(
  ({ theme }) => css`
    font-size: ${theme.size.font.tiny};
    color: ${theme.color.font.error};
  `
);

const SignUpForm = (props: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();
  const firebase = useFirebase();
  const firestore = useFirestore();

  //todo auth checker
  useEffect(() => {
    // firebase.auth;
  }, []);

  const onSubmit = (data: any) => {
    const { name, email, password } = data;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((data): any => {
        const uid = data.user?.uid;
        //todo coock time
        const now = Date.now();
        //todo add data - firestgore
        const doc = {
          name,
          email,
          created_at: now
        };
        firestore
          .collection("users")
          .doc(uid)
          .set(doc)
          .then(() => console.log(`${name} doc was creted`));
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => alert("you are signed out"));
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
          <ErrorMessage>
            {errors.name && GetErrorMessage(errors.name as IInput, "Name")}
          </ErrorMessage>
        </ErrorMessageWrapper>
        <StyledInput
          type="text"
          placeholder="e-mail"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          error={errors.email ? true : false}
        />
        <ErrorMessageWrapper>
          <ErrorMessage>
            {errors.email && GetErrorMessage(errors.email as IInput, "E-mail")}
          </ErrorMessage>
        </ErrorMessageWrapper>
        <StyledInput
          type="password"
          name="password"
          placeholder="password"
          ref={register({ required: true, min: 5, maxLength: 30 })}
          error={errors.password ? true : false}
        />
        <ErrorMessageWrapper>
          <ErrorMessage>
            {errors.password &&
              GetErrorMessage(errors.password as IInput, "Password")}
          </ErrorMessage>
        </ErrorMessageWrapper>
        <SubmitWrapper>
          <SubmitInput type="submit" />
        </SubmitWrapper>
      </StyledForm>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default SignUpForm;
