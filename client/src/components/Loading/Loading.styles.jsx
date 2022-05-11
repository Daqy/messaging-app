import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  height: 400px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Circle = styled.div`
  width: 25%;
  height: 25%;
  border-radius: 50px;
  background-color: #93e9be;
  position: absolute;
`;

export const CircleContainerRotate = styled.div`
  transform-origin: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleLoadingMessage = styled.h1`
  margin-bottom: 0px;
`;
