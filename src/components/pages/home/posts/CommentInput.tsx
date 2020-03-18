import React from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";

interface Props {}

const StyledForm = styled.form(
  ({ theme }) => css`
    background-color: #fff;
    border-bottom: ${theme.utils.borderBottom};
  `
);

const StyledInput = styled.input(
  ({ theme }) => css`
    height: 100%;
    border: none;
    width: 70%;
    font-size: ${theme.size.font.extraSmall};
    padding: 0.2em;
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

//todo handle error
const CommentInput = (props: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (data: any) => {
    const { comment } = data;
    try {
    } catch (error) {
      alert("failed to sign in");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder="Add a comment"
        name="comment"
        ref={register({ required: true, minLength: 5 })}
      />
      <SubmitInput type="submit" />
    </StyledForm>
  );
};

export default CommentInput;
