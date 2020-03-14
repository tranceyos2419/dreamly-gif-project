import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

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
