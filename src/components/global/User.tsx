import React from "react";
import styled, { css } from "styled-components";
import { IUser } from "../../@types/types";
import UserIcon from "./UserIcon";

interface Props extends IUser, Style {}

interface Style {
  margin: string;
  marginBottom: string;
}

const UserWrapper = styled.div<Style>(
  ({ theme, margin, marginBottom }) => css`
    display: flex;
    align-items: center;
    margin: ${margin};
    margin-bottom: ${marginBottom};
    background-color: #fff;
    border-radius: ${theme.size.radius.regular};
  `
);

const UserName = styled.p(
  ({ theme }) => css`
    color: #000;
    font-size: ${theme.size.font.extraSmall};
    font-weight: bold;
  `
);

const User = (props: Props) => {
  const { email, name, margin, marginBottom } = props;
  return (
    <UserWrapper margin={margin} marginBottom={marginBottom}>
      <UserIcon email={email} />
      <UserName>{name} </UserName>
    </UserWrapper>
  );
};

export default User;
