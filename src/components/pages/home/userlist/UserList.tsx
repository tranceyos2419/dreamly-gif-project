import React, { useState, useEffect } from "react";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import User from "./User";

interface Props {}

export interface IUser {
  email: string;
  name: string;
}

const UserList = (props: Props) => {
  useFirestoreConnect({ collection: "users" });
  let users: IUser[] = [];
  const state = useSelector((state: any) => state);
  const userObj = state.firestore.data.users as Object;

  if (userObj !== null && userObj !== undefined) {
    users = Object.values(userObj) as IUser[];
  }

  return (
    <div>
      <h2>User list</h2>
      {users &&
        users.map((user: IUser) => {
          const { name, email } = user;
          return <User name={name} email={email} />;
        })}
    </div>
  );
};

export default UserList;
