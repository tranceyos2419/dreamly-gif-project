import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import dreamlyIcon from "../../assets/images/Dreamly-icon.svg";
import { useSelector } from "react-redux";
import {
  useFirebase,
  useFirestoreConnect,
  useFirestore
} from "react-redux-firebase";
import Gravatar from "react-gravatar";
import logoutIcon from "../../assets/images/logout-icon.svg";
import { useHistory } from "react-router-dom";

interface Props {}

const NavWrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.background.navigation};
    display: flex;
    justify-content: space-between;
    padding: 0.2em 2em;
  `
);

const DreamlyIcon = styled.img(
  ({}) => css`
    background-color: #fff;
    border-radius: 8px;
    width: 1.2em;
    height: 1.2em;
  `
);

const UserWrapper = styled.div(
  () => css`
    display: flex;
    justify-content: center;
  `
);

const StyledGravatar = styled(Gravatar)(
  () => css`
    width: 1.25em;
    height: 1.2em;
    margin-right: 0.5em;
    border-radius: 8px;
  `
);

const StyledTitle = styled.div(
  ({ theme }) => css`
    font-size: ${theme.size.font.small};
  `
);

const LogoutIcon = styled.img(
  () => css`
    width: 0.9em;
    height: 0.9em;
    padding-top: 0.1em;
    margin-left: 0.5em;
    &:hover {
      cursor: pointer;
    }
  `
);

//todo error handling after clicking logout
const Navbar = (props: Props) => {
  const state = useSelector((state: any) => state);
  const email = state.firebase.auth.email as string;
  const [username, setUsername] = useState("");
  console.log("username:", username);
  const firestore = useFirestore();
  const firebase = useFirebase();
  const history = useHistory();

  const getUserName = async () => {
    const res = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
    const name = res.docs[0].data()["name"];
    setUsername(name);
  };

  useEffect(() => {
    getUserName();
  }, []);

  const logout = async () => {
    await firebase.auth().signOut();
    history.push("/");
  };

  return (
    <NavWrapper>
      <DreamlyIcon src={dreamlyIcon} alt="dreamly" />
      <UserWrapper>
        <StyledGravatar email={email} />
        <StyledTitle>{username}</StyledTitle>
        <LogoutIcon src={logoutIcon} alt="logout" onClick={() => logout()} />
      </UserWrapper>
      {/* <h3>Navbar</h3> */}
    </NavWrapper>
  );
};

export default Navbar;
