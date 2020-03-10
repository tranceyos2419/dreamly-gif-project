import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCounter, increment } from "../redux/slices/counterSlice";

interface Props {}

const Counter: React.FC<Props> = () => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Counter</h3>
      <h5>{counter.value}</h5>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
};

export default Counter;
