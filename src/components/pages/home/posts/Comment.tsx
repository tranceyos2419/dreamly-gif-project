import React from "react";
import styled, { css } from "styled-components";
interface Props {
  uid: string;
  comment: string;
}

//todo make getCreater general
const Comment = (props: Props) => {
  const { uid, comment } = props;
  console.log("comment:", comment);
  return (
    <div>
      <h5>Comment</h5>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
