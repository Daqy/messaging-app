import React from "react";
import * as S from "./Container.styles";

export const Container = (props) => {
  return (
    <S.Container
      height={props.height}
      width={props.width}
      styles={props.styles}
    >
      {props.children}
    </S.Container>
  );
};
