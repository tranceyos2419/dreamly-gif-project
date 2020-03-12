import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

export const useToFeedIfAuthenticated = () => {
  const history = useHistory();
  const state = useSelector((state): any => state);
  const auth = state.firebase.auth;
  const isEmpty = auth.isEmpty;

  //todo auth checker
  useEffect(() => {
    !isEmpty && history.push("/feed");
  }, isEmpty);
}

export const useToLandingIfNotAuthenticated = () => {
  const history = useHistory();
  const state = useSelector((state): any => state);
  const auth = state.firebase.auth;
  const isEmpty = auth.isEmpty;

  //todo auth checker
  useEffect(() => {
    isEmpty && history.push("/");
  }, isEmpty);
}
