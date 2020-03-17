import React from "react";

import Gravatar from "react-gravatar";
import styled, { css } from "styled-components";
import { IUser } from "../../@types/types";

//todo make User.tsx global
//todo pass the value of margin as props
//todo margin-bottom too
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

const StyledGravatar = styled(Gravatar)(
  () => css`
    padding: 0.2em;
    border-radius: 12px;
    margin-left: 0.3em;
    width: 0.8em;
    height: 0.8em;
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
      <StyledGravatar email={email} />
      <UserName>{name} </UserName>
    </UserWrapper>
  );
};

export default User;
