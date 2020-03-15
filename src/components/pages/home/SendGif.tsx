import React from "react";
import styled, { css } from "styled-components";

interface Props {}

const SendGifWrapper = styled.div(
  ({ theme }) => css`
    padding: 0.5em 0.2em;
    background-color: ${theme.color.background.secondary};
    width: 23%;
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

const SendGif = (props: Props) => {
  return (
    <SendGifWrapper>
      <Title>Send a Gif</Title>
      <p>lorem</p>
    </SendGifWrapper>
  );
};

export default SendGif;
