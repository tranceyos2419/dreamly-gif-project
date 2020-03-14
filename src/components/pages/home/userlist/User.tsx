import React from "react";
import { IUser } from "./UserList";

interface Props extends IUser {}

const User = (props: Props) => {
  return (
    <div>
      <h4>User</h4>
    </div>
  );
};

export default User;
