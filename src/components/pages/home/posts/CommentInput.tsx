import React from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useFirestore } from "react-redux-firebase";
import { IError, IInput } from "../../../../@types/types";
import { GetErrorMessage } from "../../../../helpers/helpers";
import ErrorMessage from "../../../global/ErrorMessage";

interface Props {
  uid: string;
  currentUserUid: string;
  comments: any[];
}

const StyledForm = styled.form(
  ({ theme }) => css`
    background-color: #fff;
    border-bottom: ${theme.utils.borderBottom};
  `
);

const StyledInput = styled.input<IError>(
  ({ theme, error }) => css`
    height: 100%;
    border: none;
    border-bottom: ${error ? `1.5px solid ${theme.color.font.error} ` : `none`};
    width: 70%;
    font-size: ${theme.size.font.extraSmall};
    padding: 0.2em;
    &:focus {
      outline: ${error && "none !important"};
    }
  `
);

const SubmitInput = styled.input(
  ({ theme }) => css`
    padding: 0.2em 0.5em;
    width: 20%;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: ${theme.size.font.extraSmall};
    cursor: pointer;
    &:hover {
      color: ${theme.color.font.accent};
    }
  `
);

const ErrorMessageWrapper = styled.div(
  ({ theme }) => css`
    padding-bottom: 0.5em;
    width: 80%;
    text-align: center;
  `
);

const CommentInput = (props: Props) => {
  const { uid, currentUserUid, comments } = props;
  const { register, handleSubmit, errors, reset } = useForm();
  const firestore = useFirestore();

  const onSubmit = async (data: any) => {
    const { comment } = data;
    let obj: any = {};
    obj[currentUserUid] = comment;

    let mutableComments: Object[] = comments.map(item =>
      Object.assign({}, item)
    );

    mutableComments = mutableComments.filter(
      comment => Object.keys(comment)[0] !== Object.keys(obj)[0]
    );
    mutableComments.push(obj);

    try {
      reset();
      await firestore
        .collection("posts")
        .doc(uid)
        .set({ comments: mutableComments }, { merge: true });
    } catch (error) {
      alert("failed to add the comment");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder="Add a comment"
        name="comment"
        ref={register({ required: true })}
        error={errors.comment ? true : false}
      />
      <SubmitInput type="submit" />
      <ErrorMessageWrapper>
        <ErrorMessage error={errors.comment} errorName="comment" />
      </ErrorMessageWrapper>
    </StyledForm>
  );
};

export default CommentInput;
