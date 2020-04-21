import React from "react";
import Gravatar from "react-gravatar";
import styled, { css } from "styled-components";

interface Props {
  email: string;
}

const StyledGravatar = styled(Gravatar)(
  () => css`
    padding: 0.2em;
    border-radius: 12px;
    margin-left: 0.3em;
    width: 0.8em;
    height: 0.8em;
  `
);

const UserIcon = (props: Props) => {
  const { email } = props;
  return <StyledGravatar email={email} />;
};

export default UserIcon;
