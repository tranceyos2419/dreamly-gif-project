import React from "react";
import Routes from "./routes/Routes";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

function AuthIsLoaded({ children }: { children: any }) {
  const state = useSelector((state: any) => state);
  const auth = state.firebase.auth;
  if (!isLoaded(auth)) return <div />;
  return children;
}

function App() {
  return (
    <>
      <AuthIsLoaded>
        <Routes />
      </AuthIsLoaded>
    </>
  );
}

export default App;
