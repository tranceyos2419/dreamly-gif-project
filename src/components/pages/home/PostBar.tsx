import React from "react";
import styled, { css } from "styled-components";

interface Props {}

const PostBarWrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.background.secondary};
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%; //!fixed
    border-radius: ${theme.size.radius.regular};
    margin: auto;
    margin-bottom: 0.5em;
    margin-top: 1.5em;
    h6 {
      font-size: ${theme.size.font.small};
      text-transform: uppercase;
      cursor: pointer;
      font-weight: lighter;
    }
  `
);

const PostBar = (props: Props) => {
  return (
    <PostBarWrapper>
      <h6>All</h6>
      <h6>Inbox</h6>
      <h6>Sent</h6>
    </PostBarWrapper>
  );
};

export default PostBar;
