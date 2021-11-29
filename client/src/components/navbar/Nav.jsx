import React from "react";
import { Container } from "../box-shadow/Container";
import * as S from "./Nav.styles";

export const Nav = () => {
  return (
    <Container
      width="100vw"
      height="50px"
      style="display: flex; align-items: center;"
    >
      <S.Title to="/direct-messages/">Panoramic</S.Title>
    </Container>
  );
};
