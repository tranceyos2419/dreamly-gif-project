import React from 'react'
import styled, { css } from "styled-components";
import {GetErrorMessage}from '../../helpers/helpers';
import { IInput } from '../../@types/types';

interface Props {
error:any;
errorName:string;
}

const StyledErrorMessage = styled.div(
    ({ theme }) => css`
      font-size: ${theme.size.font.tiny};
      color: ${theme.color.font.error};
    `
  );

const ErrorMessage = (props: Props) => {
    const {error, errorName} = props;
    return (
        <StyledErrorMessage>
        {error && GetErrorMessage(error as IInput, errorName)}
      </StyledErrorMessage>
    )
}

export default ErrorMessage
