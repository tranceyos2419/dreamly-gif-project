import React from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
interface Props {}

//todo test auto and firestore
const FirebaseTest: React.FC<Props> = () => {
  useFirestoreConnect({ collection: "test" });
  const state = useSelector((state: any) => state);
  const firestore = useFirestore();

  const getData = () => {
    firestore
      .collection("test")
      .get()
      .then(doc =>
        doc.docs.forEach(vallue => {
          console.log(vallue.data());
        })
      );
  };
  return (
    <div>
      <h3>Firebase Test</h3>
      <button onClick={getData}>Get data</button>
      <br />
      <Link to="/">
        <button> Go to Firebase test</button>{" "}
      </Link>
    </div>
  );
};

export default FirebaseTest;
