import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import { useFirestore } from "react-redux-firebase";

interface Props {
  uid: string;
  currentUserUid: string;
  comments: any[];
}

const StyledForm = styled.form(
  ({ theme }) => css`
    background-color: #fff;
    border-bottom: ${theme.utils.borderBottom};
  `
);

const StyledInput = styled.input(
  ({ theme }) => css`
    height: 100%;
    border: none;
    width: 70%;
    font-size: ${theme.size.font.extraSmall};
    padding: 0.2em;
  `
);

const SubmitInput = styled.input(
  ({ theme }) => css`
    padding: 0.2em 0.5em;
    width: 20%;
    border: none;
    background-color: #fff;
    color: #000;
    font-size: ${theme.size.font.extraSmall};
    cursor: pointer;
    &:hover {
      color: ${theme.color.font.accent};
    }
  `
);

//todo handle error
//todo intialize the commetn
const CommentInput = (props: Props) => {
  const { uid, currentUserUid, comments } = props;
  // const [inputComment, setInputComment] = useState("");
  const { register, handleSubmit, errors, reset } = useForm();
  const firestore = useFirestore();

  const onSubmit = async (data: any) => {
    const { comment } = data;
    let obj: any = {};
    obj[currentUserUid] = comment;

    let mutableComments: Object[] = comments.map(item =>
      Object.assign({}, item)
    );

    mutableComments = mutableComments.filter(
      comment => Object.keys(comment)[0] !== Object.keys(obj)[0]
    );
    mutableComments.push(obj);

    try {
      await firestore
        .collection("posts")
        .doc(uid)
        .set({ comments: mutableComments }, { merge: true });

      // setInputComment("");
    } catch (error) {
      alert("failed to add the comment");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledInput
        type="text"
        placeholder="Add a comment"
        name="comment"
        // value={inputComment}
        // onChange={e => setInputComment(e.target.value)}
        ref={register({ required: true, minLength: 5 })}
      />
      <SubmitInput type="submit" />
    </StyledForm>
  );
};

export default CommentInput;
