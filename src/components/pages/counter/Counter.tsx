import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCounter, increment } from "../../../redux/slices/counterSlice";
import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

interface Props {}

const Wrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.background.primary};
  `
);

const Counter: React.FC<Props> = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <h3>Counter</h3>
      <h5>{counter.value}</h5>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <br />
      <Link to="/test">
        <button> Go to Firebase test</button>{" "}
      </Link>
    </Wrapper>
  );
};

export default Counter;
