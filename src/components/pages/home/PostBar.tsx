import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  changePostType,
  selectPostType
} from "../../../redux/slices/postTypeSlice";
import { EPostType } from "../../../@types/enums";

interface Props {}

interface PostTypes {
  type: number;
}

const PostBarWrapper = styled.div<PostTypes>(
  ({ theme, type }) => css`
    background-color: ${theme.color.background.secondary};
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%; //!fixed
    border-radius: ${theme.size.radius.regular};
    margin: auto;
    margin-bottom: 0.5em;
    margin-top: 1.5em;
    h6 {
      font-size: ${theme.size.font.small};
      text-transform: uppercase;
      cursor: pointer;
      font-weight: lighter;
    }
    h6:active {
      color: ${theme.color.font.accent};
    }
    h6:nth-child(${type + 1}) {
      color: ${theme.color.font.accent};
    }
  `
);

const PostBar = (props: Props) => {
  const postType = useSelector(selectPostType);
  const dispatch = useDispatch();
  return (
    <PostBarWrapper type={postType.type}>
      <h6 onClick={() => dispatch(changePostType({ type: EPostType.All }))}>
        All
      </h6>
      <h6 onClick={() => dispatch(changePostType({ type: EPostType.Inbox }))}>
        Inbox
      </h6>
      <h6 onClick={() => dispatch(changePostType({ type: EPostType.Sent }))}>
        Sent
      </h6>
    </PostBarWrapper>
  );
};

export default PostBar;
