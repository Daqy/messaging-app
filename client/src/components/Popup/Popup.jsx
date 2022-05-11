import React from "react";
import * as S from "./Popup.styles";

export const Popup = (props) => {
  return (
    <S.PopupContainer>
      <S.PopupBox>
        <S.CloseIcon onClick={props.handleClose}>x</S.CloseIcon>
        {props.children}
      </S.PopupBox>
    </S.PopupContainer>
  );
};
