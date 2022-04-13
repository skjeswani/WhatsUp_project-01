import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import whatsup from "./assets/Whatsup_image.png";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { useStatevalue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStatevalue();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    });
  };

  const pointerHandler = () => {
    if (
      window.confirm(
        "A project by Shubham Jeswani \nClick ok to check out the Github repository"
      )
    ) {
      window.location.href =
        "https://github.com/skjeswani2001/WhatsUp_project-01";
    }
    // "A project by Shubham Jeswani \nCheck out the code here : \nhttps://github.com/skjeswani2001/WhatsUp_project-01"
  };

  return (
    <div className="full_page" onLoad={pointerHandler}>
      <div className="login">
        <div className="login_container">
          <img src={whatsup} alt="" />
          <div className="login_text">
            <h1>Hola, it's WhatsUp 🚀🚀</h1>
          </div>
          <Button type="submit" onClick={signIn}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
