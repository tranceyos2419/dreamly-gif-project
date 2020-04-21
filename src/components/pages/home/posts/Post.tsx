import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { firestore } from "firebase";
import User from "../../../global/User";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import { GetUserDataFromFirestoreByUid } from "../../../hooks/myCustomHooks";
import CommentInput from "./CommentInput";
import { EPostType } from "../../../../@types/enums";

interface Props {
  uid: string;
  imgUrl: string;
  created_by: string;
  likes: string[];
  comments: Object[];
  type: EPostType;
}

const PostWrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.background.secondary};
    margin-bottom: 1em;
  `
);

const StyledImg = styled.img(
  () => css`
    width: 100%;
    display: block;
  `
);

const ActionBar = styled.div(
  ({ theme }) => css`
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0.2em 0.4em;
    border-bottom: 1px solid #ccc;
    border: 1px solid black;
  `
);

const Likes = styled.p(
  ({ theme }) => css`
    margin-left: 0.2em;
    margin-top: -5%;
    display: inline-block;
    color: black;
    font-size: ${theme.size.font.regular};
  `
);
interface WasUserLiked {
  wasUserLiked: boolean;
}
const StyledIcon = styled(FontAwesomeIcon)<WasUserLiked>(
  ({ wasUserLiked }) => css`
    color: ${wasUserLiked ? "red" : "#000"};
    cursor: pointer;
  `
);

const Post = (props: Props) => {
  const { uid, created_by, imgUrl, likes, comments, type } = props;
  const state = useSelector((state: any) => state);
  const currentUserUid = state.firebase.auth.uid;
  const wasUserLiked = likes.some((uid) => uid === currentUserUid);
  const creator = GetUserDataFromFirestoreByUid(created_by);

  const handleLike = async () => {
    try {
      let newLikes = [];
      if (wasUserLiked) {
        newLikes = likes.filter((id) => id !== currentUserUid);
      } else {
        newLikes = Object.assign([], likes);
        newLikes.push(currentUserUid);
      }
      await firestore()
        .collection("posts")
        .doc(uid)
        .update({ likes: newLikes });
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <PostWrapper>
      <User
        name={creator.name}
        email={creator.email}
        marginBottom="0em"
        margin="0em"
      />
      <StyledImg src={imgUrl} alt="gif" />
      <ActionBar>
        <div>
          <StyledIcon
            wasUserLiked={wasUserLiked}
            icon={faHeart}
            onClick={() => handleLike()}
          />
          <Likes>{likes.length}</Likes>
        </div>
      </ActionBar>

      {type === EPostType.Inbox && (
        <CommentInput
          uid={uid}
          currentUserUid={currentUserUid}
          comments={comments}
        />
      )}
      {comments &&
        comments.map((commentObj) => {
          const uid = Object.keys(commentObj)[0] as string;
          const comment = Object.values(commentObj)[0] as string;
          return <Comment key={uid} uid={uid} comment={comment} />;
        })}
    </PostWrapper>
  );
};

export default Post;
