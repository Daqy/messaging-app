import React, { useState, useLayoutEffect } from "react";
import * as S from "./UserProfile.styles";
import { UserContext } from "../../App.js";

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

export const UserProfile = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [width, height] = useWindowSize();

  return (
    <>
      <S.Container content={`${user.name} #${user.hashtag}`}>
        <S.ImageContainer>
          <S.Image src={user.pfp}></S.Image>
        </S.ImageContainer>
        {width > 1400 ? (
          <>
            <S.Username>{user.name}</S.Username>
            <S.Hashtag>#{user.hashtag}</S.Hashtag>
          </>
        ) : (
          <></>
        )}
      </S.Container>
    </>
  );
};
