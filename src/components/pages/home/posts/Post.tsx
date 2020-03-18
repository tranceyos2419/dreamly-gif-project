import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { firestore } from "firebase";
import User from "../../../global/User";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import Comment from "./Comment";
interface Props {
  uid: string;
  imgUrl: string;
  created_by: string;
  likes: string[];
  comments: [];
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

const StyledLetter = styled.p(
  ({ theme }) => css`
    color: #000;
    font-size: ${theme.size.font.small};
    cursor: pointer;
  `
);

//todo display comment
const Post = (props: Props) => {
  const [creator, setcreator] = useState({ name: "", email: "" });
  const { uid, created_by, imgUrl, likes, comments } = props;
  const state = useSelector((state: any) => state);
  const currentUserUid = state.firebase.auth.uid;
  const wasUserLiked = likes.some(uid => uid === currentUserUid);

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

  const handleLike = async () => {
    try {
      let newLikes = [];
      if (wasUserLiked) {
        newLikes = likes.filter(id => id !== currentUserUid);
      } else {
        newLikes = Object.assign([], likes);
        newLikes.push(currentUserUid);
      }
      await firestore()
        .collection("posts")
        .doc(uid)
        .update({ likes: newLikes });
    } catch (error) {
      console.log("error:", error);
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
        <StyledIcon
          wasUserLiked={wasUserLiked}
          icon={faHeart}
          onClick={() => handleLike()}
        />
        <StyledLetter>Comment</StyledLetter>
        {comments &&
          comments.map(commentObj => {
            const uid = Object.keys(commentObj)[0] as string;
            const comment = Object.values(commentObj)[0] as string;
            return <Comment uid={uid} comment={comment} />;
          })}
      </ActionBar>
    </PostWrapper>
  );
};

export default Post;
