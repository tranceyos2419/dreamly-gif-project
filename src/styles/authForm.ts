import styled, { css } from "styled-components";
import { IError } from "../@types/types";

export const StyledForm = styled.form(
    () => css`
      padding: 0em 0.5em;
      margin: auto;
    `
  );

  export const StyledInput = styled.input<IError>(
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

  export const SubmitWrapper = styled.div(
    ({ theme }) => css`
      display: flex;
      justify-content: flex-end;
      width: 50%;
      border: 1px sold red;
      margin: auto;
      margin-top: 0.5em;
    `
  );

  export const SubmitInput = styled.input(
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

  export const ErrorMessageWrapper = styled.div(
    ({ theme }) => css`
      margin: auto;
      display: flex;
      justify-content: flex-start;
      width: 50%;
    `
  );
