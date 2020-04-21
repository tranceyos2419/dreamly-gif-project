import React from "react";
import styled, { css } from "styled-components";
import { GetUserDataFromFirestoreByUid } from "../../../hooks/myCustomHooks";
import UserIcon from "../../../global/UserIcon";
interface Props {
  uid: string;
  comment: string;
}

const CommentWrapper = styled.div(
  () => css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding: 0.2em 0.1em;
  `
);

const UserName = styled.h6(
  ({ theme }) => css`
    color: #0e86cc;
    font-size: ${theme.size.font.extraSmall};
  `
);

const StyledComment = styled.p(
  ({ theme }) => css`
    color: black;
    font-size: ${theme.size.font.extraSmall};
    margin: 0em 0.5em;
  `
);

const Comment = (props: Props) => {
  const { uid, comment } = props;
  const user = GetUserDataFromFirestoreByUid(uid);
  const { email, name } = user;
  return (
    <CommentWrapper>
      <UserIcon email={email} />
      <UserName>{name}</UserName>
      <StyledComment>{comment}</StyledComment>
    </CommentWrapper>
  );
};

export default Comment;
