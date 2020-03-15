import React from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { IError, IInput } from "../../../@types/types";
import { GetErrorMessage } from "../../../helpers/helpers";

interface Props {}

const SendGifWrapper = styled.div(
  ({ theme }) => css`
    padding: 0.5em 0.2em;
    background-color: ${theme.color.background.secondary};
    width: 23%; //!fixed
    border-radius: ${theme.size.radius.regular};
  `
);

const Title = styled.h5(
  ({ theme }) => css`
    font-size: ${theme.size.font.small};
    font-weight: lighter;
    margin-bottom: 0.4em;
  `
);

const StyledForm = styled.form(
  () => css`
    /* padding: 0em 0.5em; */
    /* margin: auto; */
  `
);

const StyledInput = styled.input<IError>(
  ({ theme, error }) => css`
    padding: 0.3em 0.1em;
    margin-top: 3em;
    /* margin-bottom: 1em; */
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
    /* display: flex; */
    /* justify-content: flex-end; */
    /* width: 50%; */
    /* margin: auto; */
    /* margin-top: 0.5em; */
  `
);

const SubmitInput = styled.input(
  ({ theme }) => css`
    padding: 0.5em 30%;
    background: transparent;
    border: 1px solid ${theme.color.font.primary};
    font-size: ${theme.size.font.extraSmall};
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
    /* display: flex; */
    /* justify-content: flex-start; */
    /* width: 50%; */
  `
);

const ErrorMessage = styled.div(
  ({ theme }) => css`
    font-size: ${theme.size.font.tiny};
    color: ${theme.color.font.error};
  `
);

//todo add a pattern to input to restrict the form of user-input
//todo change name to names
const SendGif = (props: Props) => {
  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = async (data: any) => {
    const { name } = data;
    try {
      console.log("name", name);
    } catch (error) {
      alert("failed to sign up");
    }
  };

  return (
    <SendGifWrapper>
      <Title>Send a Gif</Title>
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
        <SubmitWrapper>
          <SubmitInput type="submit" />
        </SubmitWrapper>
      </StyledForm>
    </SendGifWrapper>
  );
};

export default SendGif;
