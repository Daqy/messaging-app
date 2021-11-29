import React, { useEffect } from "react";
import * as S from "./Button.styles";

export const Button = (props) => {
  const myfunction = () => {
    console.log("Test");
  };
  useEffect(() => {
    myfunction();
  }, []);
  return (
    <>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
      <S.Button>{props.text}</S.Button>
    </>
  );
};
