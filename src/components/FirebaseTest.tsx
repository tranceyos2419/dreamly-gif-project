import React from "react";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

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
    </div>
  );
};

export default FirebaseTest;
