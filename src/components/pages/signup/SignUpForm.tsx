import React from "react";
import { getCurrentDate } from "../../../helpers/helpers";
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

const SignUpForm = (props: Props) => {
  const { register, handleSubmit, errors } = useForm();
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
