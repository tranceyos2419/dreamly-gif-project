import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { IComment } from "../../../../@types/types";
import { firestore } from "firebase";
import User from "../userlist/User";
interface Props {
  uid: string;
  imgUrl: string;
  created_by: string;
  likes: string[];
  comments: IComment[];
}

const PostWrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.background.secondary};
  `
);

const StyledImg = styled.img(
  () => css`
    width: 100%;
  `
);

const ActionBar = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
  `
);

const Post = (props: Props) => {
  const [creator, setcreator] = useState({ name: "", email: "" });
  console.log("creator:", creator);
  const { uid, created_by, imgUrl, likes, comments } = props;
  console.log("created_by:", created_by);

  const getcreator = async () => {
    const res = await firestore()
      .collection("users")
      .doc(created_by)
      .get();
    const data = res.data();
    const { name, email } = data;
    setcreator({ name, email });
  };

  useEffect(() => {
    getcreator();
  }, []);

  return (
    <PostWrapper>
      <h5>Post</h5>
      <User name={creator.name} email={creator.email} />
      <StyledImg src={imgUrl} alt="gif" />
      <ActionBar>
        <p>Heart</p>
        <p>Comment</p>
      </ActionBar>
    </PostWrapper>
  );
};

export default Post;
