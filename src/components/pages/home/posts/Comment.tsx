import React from "react";
import styled, { css } from "styled-components";
import { GetUserDataFromFirestoreByUid } from "../../../hooks/myCustomHooks";
interface Props {
  uid: string;
  comment: string;
}

const Comment = (props: Props) => {
  const { uid, comment } = props;
  const user = GetUserDataFromFirestoreByUid(uid);
  console.log("user:", user);
  return (
    <div>
      <h5>Comment</h5>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
