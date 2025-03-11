import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const clientId = "905622334707-u9jtfm44li34c090k0jfmgf6dfkk39lt.apps.googleusercontent.com"; // Replace with your actual client ID

const GoogleAuth = ({loginUser}) => {
  // const handleSuccess = (credentialResponse) => {
  //   console.log("Google Login Response:", credentialResponse);
  //   alert("Login Successful!");
  // };

  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const base64Url = token.split(".")[1]; // Extract payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  
    const user = JSON.parse(jsonPayload); // Convert to JSON
    // console.log("User Info:", user);
    var res = {
      token: credentialResponse.clientId,
      name: user.name,
      email: user.email,
      image: user.picture,
    };
    loginUser(res);
    // alert(`Welcome, ${user.name}!`);
  };

  const handleError = () => {
    toast.error("Login Failed!");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        {/* <h2>Login with Google</h2> */}
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
