import React from "react";
import styled, { css } from "styled-components";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { IPost } from "../../../../@types/types";
import Post from "./Post";

interface Props {}

const PostsWrapper = styled.div(
  ({ theme }) => css`
    /* padding: 0.5em 0.2em; */
    /* background-color: ${theme.color.background.secondary}; */
    width: 40%; //!fixed
    /* border-radius: ${theme.size.radius.regular}; */
  `
);

const Posts = (props: Props) => {
  useFirestoreConnect({ collection: "posts" });
  const state = useSelector((state: any) => state);
  const postsObj = state.firestore.data.posts;
  const postsArray = postsObj && Object.entries(postsObj);
  return (
    <PostsWrapper>
      {postsArray &&
        postsArray.map((postData: any) => {
          const uid = postData[0] as string;
          const post = postData[1] as IPost;
          const { imgUrl, created_by, likes, comments } = post;
          return (
            <Post
              uid={uid}
              imgUrl={imgUrl}
              created_by={created_by}
              likes={likes}
              comments={comments}
            />
          );
        })}
    </PostsWrapper>
  );
};

export default Posts;
