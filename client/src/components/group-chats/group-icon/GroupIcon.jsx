import React, { useState } from "react";
import * as S from "./GroupIcon.styles";

export const GroupIcon = (props) => {
  return (
    <S.Container>
      {props.users.length == 1 ? (
        <S.ImageContainer>
          <S.Image src={props.users[0].pfp}></S.Image>
        </S.ImageContainer>
      ) : props.users.length == 2 || props.users.length == 3 ? (
        props.users.map((user) => (
          <S.ImageContainer key={user._id} size="50%">
            <S.Image src={user.pfp}></S.Image>
          </S.ImageContainer>
        ))
      ) : (
        <>
          {props.users.map((user, index) => {
            if (index < 3) {
              return (
                <S.ImageContainer key={user._id} size="50%">
                  <S.Image src={user.pfp}></S.Image>
                </S.ImageContainer>
              );
            }
          })}
          <S.ImageContainer size="50%">
            <S.BlankImage>+{props.users.length - 3}</S.BlankImage>
          </S.ImageContainer>
        </>
      )}
    </S.Container>
  );
};
