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
  const state = useSelector((state: any) => state);
  const [users, setUsers] = useState(null);
  let values: any;
  const userObj = state.firestore.data.users as Object;

  if (userObj !== null && userObj !== undefined) {
    values = Object.values(userObj) as IUser[];
  }

  useEffect(() => {
    setUsers(values);
  }, values);

  return (
    <div>
      <h2>User list</h2>
      {/* {users &&
        users.map(user => {
          const { name, email } = user;
          return <User name={name} email={email} />;
        })} */}
    </div>
  );
};

export default UserList;
