import React from "react";
import styled, { css } from "styled-components";
import background from "../../../assets/images/Landing-background.svg";
import { Link } from "react-router-dom";
import { useToHomeIfAuthenticated } from "../../hooks/myCustomHooks";
interface Props {}

const LandingWrapper = styled.div(
  () => css`
    background: url(${background}) no-repeat center center fixed;
    height: 1024px;
  `
);

const HeadLine = styled.h3(
  ({ theme }) => css`
    font-size: ${theme.size.font.huge};
  `
);

const Spacer = styled.div(
  () => css`
    height: 6em;
  `
);

const ButtonWrapper = styled.div(
  () => css`
    margin-top: 2em;
    display: flex;
    justify-content: space-evenly;
  `
);

const StyledButton = styled.button(
  ({ theme }) => css`
    padding: 0.6em 1.2em;
    background: transparent;
    font-size: ${theme.size.font.large};
    border: 2.5px solid ${theme.color.font.primary};
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.button.background};
    }
  `
);

const Landing = (props: Props) => {
  useToHomeIfAuthenticated();
  return (
    <LandingWrapper>
      <Spacer />
      <HeadLine>Dreamly Gif Project</HeadLine>
      <ButtonWrapper>
        <Link to="/signup">
          <StyledButton> Sign up</StyledButton>
        </Link>
        <Link to="/signin">
          <StyledButton>Sign in</StyledButton>
        </Link>
      </ButtonWrapper>
    </LandingWrapper>
  );
};

export default Landing;
