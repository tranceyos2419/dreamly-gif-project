import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { IError, IInput } from "../../../@types/types";
import { GetErrorMessage } from "../../../helpers/helpers";
import { useFirebase } from "react-redux-firebase";

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

const StyledLabel = styled.label(
  ({ theme }) => css`
    cursor: pointer;
    font-size: ${theme.size.font.small};
    &:hover {
      color: ${theme.color.button.background};
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

const SendGif = (props: Props) => {
  const [gif, setGif] = useState(null);
  const firebase = useFirebase();
  const { register, handleSubmit, errors, reset } = useForm();

  const handleImageChange = (e: any) => {
    if (e !== null && e !== undefined) {
      const [file] = e.target?.files;
      if (file) {
        setGif(file);
        // firebase.uploadFile("/image", file).then((value: any) => {
        //   console.log("file was upload", value);
        // });
        console.log(file);
      }
    }
  };

  const onSubmit = async (data: any) => {
    const { name, gif } = data;
    try {
      console.log("name", gif[0]);
    } catch (error) {
      alert("failed to sign up");
    }
  };

  //todo add a pattern to input to restrict the form of user-input
  //todo change name to names
  //todo intergrate it to firebase
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
        <StyledLabel htmlFor="gif">
          {gif !== null ? gif.name : "Choose a gif"}
        </StyledLabel>
        <input
          id="gif"
          name="gif"
          type="file"
          accept="image/gif"
          multiple={false}
          style={{ display: "none" }}
          onChange={e => handleImageChange(e)}
          ref={register({ required: true })}
        />
        <ErrorMessageWrapper>
          <ErrorMessage>
            {errors.gif && GetErrorMessage(errors.gif as IInput, "Gif")}
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
