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
  `
);

const StyledInput = styled.input<IError>(
  ({ theme, error }) => css`
    padding: 0.3em 0.1em;
    background: transparent;
    border: none;
    width: 75%;
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
    const { names, gif } = data;
    try {
      console.log("names:", names);
      console.log("name", gif[0]);
    } catch (error) {
      alert("failed to sign up");
    }
  };

  //todo sanetize names
  //todo validate there is a user who is corresponsing to the input
  //todo intergrate it to firebase
  return (
    <SendGifWrapper>
      <Title>Send a Gif</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="text"
          placeholder="@username,@username,..."
          name="names"
          ref={register({
            required: true,
            min: 5,
            pattern: /^@+\S+,+$/i
          })}
          error={errors.names ? true : false}
        />
        <ErrorMessage>
          {errors.names && GetErrorMessage(errors.names as IInput, "Name")}
        </ErrorMessage>
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
        <ErrorMessage>
          {errors.gif && GetErrorMessage(errors.gif as IInput, "Gif")}
        </ErrorMessage>
        <SubmitInput type="submit" />
      </form>
    </SendGifWrapper>
  );
};

export default SendGif;
