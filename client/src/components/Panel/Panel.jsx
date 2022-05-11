import React from "react";
import * as S from "./Panel.styles";

export const Panel = (props) => {
  if (props.children != undefined) {
    return (
      <S.Container>
        <S.TitleContainer>
          <S.Title>{props.title}</S.Title>
        </S.TitleContainer>
        <S.ChatContainer>{props.children}</S.ChatContainer>
      </S.Container>
    );
  } else {
    return "more children required for component";
  }
};
