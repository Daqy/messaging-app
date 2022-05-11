import React, { useLayoutEffect, useState } from "react";
import * as S from "./Nav.styles";
import { UserProfile } from "../UserProfile/UserProfile";
import { NavigationOptions } from "../NavbarOptions/NavigationOption/NavigationOption";
import { ServerOptions } from "../NavbarOptions/ServerOption/ServerOption";
import { QuickAccess } from "../NavbarOptions/QuickAccess/QuickAccess";
import DeleteIcon from "@material-ui/icons/Delete";
import { UserContext } from "../../App.js";
import axios from "axios";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const Nav = () => {
  const [width, height] = useWindowSize();
  const [user, setUser] = React.useContext(UserContext);

  function _handleDeleteUserAccount(event) {
    console.log(event);
    axios
      .post("http://localhost:4000/DeleteAccount", {
        sessionID: document.cookie.split("=")[1].split(".")[0],
        ...user,
      })
      .then((res) => {
        // setUser([]);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <S.Container>
      <UserProfile />
      <NavigationOptions />
      <QuickAccess />
      <ServerOptions />

      <S.BottomContainer>
        <S.DeleteAccountContainer onClick={_handleDeleteUserAccount}>
          {width > 1400 ? (
            <S.DeleteAccount>Delete Account</S.DeleteAccount>
          ) : (
            <S.SVGContainer>
              <DeleteIcon />
            </S.SVGContainer>
          )}
        </S.DeleteAccountContainer>
        <S.LogoContainer>
          <S.Logo src="/logo.png"></S.Logo>
          {width > 1400 ? <S.LogoText>Liffy</S.LogoText> : <></>}
        </S.LogoContainer>
      </S.BottomContainer>
    </S.Container>
  );
};
