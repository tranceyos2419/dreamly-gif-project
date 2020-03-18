import { firestore } from 'firebase';
import { IUser } from './../../@types/types';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';

export const useToHomeIfAuthenticated = () => {
  const history = useHistory();
  const state = useSelector((state): any => state);
  const auth = state.firebase.auth;
  const isEmpty = auth.isEmpty;

  useEffect(() => {
    !isEmpty && history.push("/home");
  }, isEmpty);
}

export const useToLandingIfNotAuthenticated = () => {
  const history = useHistory();
  const state = useSelector((state): any => state);
  const auth = state.firebase.auth;
  const isEmpty = auth.isEmpty;

  useEffect(() => {
    isEmpty && history.push("/");
  }, isEmpty);
}

export const GetUserDataFromFirestoreByUid = (uid: string): IUser => {
  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    const getuser = async () => {
      const res = await firestore()
        .collection("users")
        .doc(uid)
        .get();
      const data = res.data();
      const { name, email } = data;
      setUser({ name, email });
    };
    getuser();
  }, [uid]);

  return user;
}
