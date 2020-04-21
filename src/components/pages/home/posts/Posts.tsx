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
  () => css`
    width: 40%; //!fixed
  `
);

const filterPostsArrayBasedOnPostBartType = (
  array: [string, unknown][],
  type: EPostType,
  currentUserUid: string
): [string, unknown][] => {
  let newArray: any = null;

  switch (type) {
    case EPostType.All:
      return array;

    case EPostType.Inbox:
      newArray = array.filter((arr) => {
        const post = arr[1] as IPost;
        return post.sent.some((sentUser) => {
          return sentUser === currentUserUid;
        });
      });
      return newArray;

    case EPostType.Sent:
      newArray = array.filter((arr) => {
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

  // sorting posts by created_at
  array &&
    array.sort((a, b) => {
      const aPost = a[1] as IPost;
      const bPost = b[1] as IPost;
      return Date.parse(bPost.created_at) - Date.parse(aPost.created_at);
    });
  const postsArray = filterPostsArrayBasedOnPostBartType(
    array,
    postBarType.type,
    currentUserUid
  );

  return (
    <PostsWrapper>
      {postsArray &&
        postsArray.map((postData: any) => {
          const uid = postData[0] as string;
          const post = postData[1] as IPost;
          const { imgUrl, created_by, likes, comments } = post;
          return (
            <Post
              key={uid}
              uid={uid}
              imgUrl={imgUrl}
              created_by={created_by}
              likes={likes}
              comments={comments}
              type={postBarType.type}
            />
          );
        })}
    </PostsWrapper>
  );
};

export default Posts;
