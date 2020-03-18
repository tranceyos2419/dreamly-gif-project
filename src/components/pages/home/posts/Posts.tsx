import React from "react";
import styled, { css } from "styled-components";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { IPost } from "../../../../@types/types";

import Post from "./Post";
import { selectPostType } from "../../../../redux/slices/postTypeSlice";
import { EPostType } from "../../../../@types/enums";
import { bindActionCreators } from "@reduxjs/toolkit";

interface Props {}

const PostsWrapper = styled.div(
  ({ theme }) => css`
    /* padding: 0.5em 0.2em; */
    /* background-color: ${theme.color.background.secondary}; */
    width: 40%; //!fixed
    /* border-radius: ${theme.size.radius.regular}; */
  `
);

//todo display descendently accroding to created_at (especially when user add a gif)

const getPostsArray = (
  array: [string, unknown][],
  type: EPostType,
  currentUserUid: string
): any => {
  let newArray: any = null;

  switch (type) {
    case EPostType.All:
      return array;

    case EPostType.Inbox:
      newArray = array.filter(arr => {
        const post = arr[1] as IPost;
        return post.sent.some(sentUser => {
          return sentUser === currentUserUid;
        });
      });
      return newArray;

    case EPostType.Sent:
      newArray = array.filter(arr => {
        const post = arr[1] as IPost;
        return post.created_by === currentUserUid;
      });
      return newArray;

    default:
      return array;
  }
};

const Posts = (props: Props) => {
  const postBarType = useSelector(selectPostType);
  useFirestoreConnect({ collection: "posts" });
  const state = useSelector((state: any) => state);
  const currentUserUid = state.firebase.auth.uid;
  const postsObj = state.firestore.data.posts;
  const array = postsObj && Object.entries(postsObj);
  const postsArray = getPostsArray(array, postBarType.type, currentUserUid);

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
