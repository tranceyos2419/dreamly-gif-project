import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useForm } from "react-hook-form";
import { IError, IInput, IUser, IPost } from "../../../@types/types";
import {
  GetErrorMessage,
  getValueOfObject,
  getCurrentDate
} from "../../../helpers/helpers";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect
} from "react-redux-firebase";
import { useSelector } from "react-redux";
import ErrorMessage from "../../global/ErrorMessage";

interface Props {}

const SendGifWrapper = styled.div(
  ({ theme }) => css`
    padding: 0.5em 0.2em;
    background-color: ${theme.color.background.secondary};
    width: 23%; //!fixed
    border-radius: ${theme.size.radius.regular};
    height: 30%; //!fixed
  `
);

const Title = styled.h5(
  ({ theme }) => css`
    font-size: ${theme.size.font.small};
    font-weight: lighter;
  `
);

const StyledInput = styled.input<IError>(
  ({ theme, error }) => css`
    padding: 0.3em 0.1em;
    background: transparent;
    border: none;
    width: 75%;
    border-bottom: ${error
      ? `1.5px solid ${theme.color.font.error} `
      : `1.5px solid ${theme.color.font.primary}`};
    color: ${theme.color.font.primary};
    ::placeholder {
      color: ${theme.color.font.primary};
    }
    ::-webkit-input-placeholder {
      color: ${theme.color.font.primary};
    }
    &:focus {
      outline: none !important;
      border-color: ${theme.color.font.accent};
    }
  `
);

const StyledLabel = styled.label(
  ({ theme }) => css`
    cursor: pointer;
    font-size: ${theme.size.font.small};
    &:hover {
      color: ${theme.color.button.background};
    }
  `
);

const SubmitInput = styled.input(
  ({ theme }) => css`
    padding: 0.5em 30%;
    background: transparent;
    border: 1px solid ${theme.color.font.primary};
    font-size: ${theme.size.font.extraSmall};
    border-radius: 4px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: ${theme.color.button.background};
    }
  `
);

const getArrayOfSanitizedNames = (names: string): string[] => {
  const namesArray = names.split(",");
  namesArray.pop();
  return namesArray.map((name: string) => {
    return name.substr(1);
  });
};

const getUidsFromNames = (
  names: string[],
  objArray: [string, any][]
): string[] => {
  const uids = names.map(name => {
    let uid = "";
    objArray.forEach(([key, value]) => {
      const objName = value.name as string;
      if (objName == name) {
        uid = key;
      }
    });
    return uid;
  });
  return uids;
};

const SendGif = (props: Props) => {
  const [names, setNames] = useState("");
  const [gif, setGif] = useState(null);
  useFirestoreConnect({ collection: "users" });
  const firebase = useFirebase();
  const firestore = useFirestore();
  const storageRef = firebase.storage().ref();
  const { register, handleSubmit, errors, reset } = useForm();

  let users: IUser[] = [];
  const state = useSelector((state: any) => state);
  const currentUserUid = state.firebase.auth.uid;
  const currentUserName = state.firebase.profile.name;
  //get all users from firestore
  const userObj = state.firestore.data.users as Object;
  users = getValueOfObject<IUser>(userObj);
  //remove current user from users
  users = users && users.filter(user => user.name !== currentUserName);

  const handleImageChange = async (e: any) => {
    try {
      if (e !== null && e !== undefined) {
        const [file] = e.target?.files;
        setGif(file);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const onSubmit = async (data: any) => {
    const { names, gif }: { names: string; gif: File[] } = data;
    const sanitiledNames = getArrayOfSanitizedNames(names);
    const objArray = Object.entries(userObj);
    const userNames = users.map(user => user.name);

    // //* validation
    const isAllNamesAreUserNames = sanitiledNames.every(r =>
      userNames.includes(r)
    );

    try {
      if (isAllNamesAreUserNames) {
        // uids of sent users
        const uids = getUidsFromNames(sanitiledNames, objArray);

        // saving image to storage and get the url
        const imageRef = storageRef.child(`images/${gif[0].name}`);
        await imageRef.put(gif[0]);
        const imgUrl = await imageRef.getDownloadURL();

        const post: IPost = {
          imgUrl,
          created_by: currentUserUid,
          created_at: getCurrentDate(),
          likes: [],
          sent: uids,
          waitingForAnswer: uids,
          comments: []
        };

        await firestore.collection("posts").add(post);

        setGif(null);
        setNames("");

        alert(`your gif was sent to selected users`);
      } else {
        alert("usernames are incorrect");
      }
    } catch (error) {
      alert("failed to sign up");
    }
  };

  return (
    <SendGifWrapper>
      <Title>Send a Gif</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="text"
          placeholder="@username,@username,..."
          name="names"
          value={names}
          onChange={e => setNames(e.target.value)}
          ref={register({
            required: true,
            min: 5,
            pattern: /^@+\S+,+$/i
          })}
          error={errors.names ? true : false}
        />
        <ErrorMessage error={errors.names} errorName={'Name'} />
        <StyledLabel htmlFor="gif">
          {gif !== null ? gif.name : "Choose a gif"}
        </StyledLabel>
        <input
          id="gif"
          name="gif"
          type="file"
          accept="image/gif"
          multiple={false}
          style={{ display: "none" }}
          onChange={e => handleImageChange(e)}
          ref={register({ required: true })}
        />
        <ErrorMessage error={errors.gif} errorName="Gif" />
        <SubmitInput type="submit" />
      </form>
    </SendGifWrapper>
  );
};

export default SendGif;
