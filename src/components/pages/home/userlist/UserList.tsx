import React, { useState, useEffect } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import User from "../../../global/User";
import styled, { css } from "styled-components";
import { getValueOfObject } from "../../../../helpers/helpers";
import { IUser } from "../../../../@types/types";

interface Props {}

const UserListWrapper = styled.div(
  ({ theme }) => css`
    padding: 0.5em 0.2em;
    background-color: ${theme.color.background.secondary};
    width: 23%;
    border-radius: ${theme.size.radius.regular};
  `
);

const Title = styled.h5(
  ({ theme }) => css`
    font-size: ${theme.size.font.small};
    font-weight: lighter;
    margin-bottom: 0.4em;
  `
);

const UserList = (props: Props) => {
  useFirestoreConnect({ collection: "users" });
  let users: IUser[] = [];
  const state = useSelector((state: any) => state);
  const currentUserName = state.firebase.profile.name;
  const userObj = state.firestore.data.users as Object;
  users = getValueOfObject<IUser>(userObj);
  users = users && users.filter(user => user.name !== currentUserName);

  return (
    <UserListWrapper>
      <Title>Users</Title>
      {users &&
        users.map((user: IUser) => {
          const { name, email } = user;
          return (
            <User
              name={name}
              email={email}
              margin="0em 0.4em"
              marginBottom="0.5em"
            />
          );
        })}
    </UserListWrapper>
  );
};

export default UserList;
