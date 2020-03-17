import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { IComment } from "../../../../@types/types";
import { firestore } from "firebase";
import User from "../../../global/User";
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
    margin-bottom: 1em;
  `
);

const StyledImg = styled.img(
  () => css`
    width: 100%;
    /* height: 80%; */
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

const StyledIcon = styled(FontAwesomeIcon)(
  () => css`
    color: #000;
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

//todo toggle like
//todo toggle comment
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
      <User
        name={creator.name}
        email={creator.email}
        marginBottom="0em"
        margin="0em"
      />
      <StyledImg src={imgUrl} alt="gif" />
      <ActionBar>
        <StyledIcon icon={faHeart} />
        <StyledLetter>Comment</StyledLetter>
      </ActionBar>
    </PostWrapper>
  );
};

export default Post;
