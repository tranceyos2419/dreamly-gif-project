import React, { useEffect, useState } from "react";

import { IComment } from "../../../../@types/types";
import { firestore } from "firebase";
interface Props {
  uid: string;
  imgUrl: string;
  created_by: string;
  likes: string[];
  comments: IComment[];
}

//todo get the data of sent user;

const Post = (props: Props) => {
  const [creator, setcreator] = useState({ name: "", email: "" });
  console.log("creator:", creator);
  const { uid, created_by } = props;
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
    <div>
      <h5>Post</h5>
    </div>
  );
};

export default Post;
