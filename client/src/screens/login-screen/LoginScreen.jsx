import React from "react";
import * as S from "./LoginScreen.styles";
import isElectron from "is-electron";

export const LoginScreen = (props) => {
  return (
    <S.BGContainer>
      <S.loginContainer>
        <S.logoContainer></S.logoContainer>
        <S.title>Welcome Back!</S.title>
        <S.description>We're glad to see you back</S.description>
        <S.loginButton
          href={`http://localhost:4000/login?redirectUrl=${
            props?.location?.state?.returnUrl || "/direct-messages"
          }`}
        >
          Sign in with Google
        </S.loginButton>
        {isElectron() ? (
          <></>
        ) : (
          <S.DownloadClient href="avatar.png" download="profilePicture">
            Click here to download Desktop Application
          </S.DownloadClient>
        )}
      </S.loginContainer>
    </S.BGContainer>
  );
};

// https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075259.jpg
