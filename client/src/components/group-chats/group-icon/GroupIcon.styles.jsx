import styled from "styled-components";

const imageSize = "45px";

export const Container = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  // background-color: black;
  overflow: hidden;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ImageContainer = styled.div`
  border-radius: 50px;
  overflow: hidden;
  width: ${(props) => (props.size ? props.size : "")};
  height: ${(props) => (props.size ? props.size : "")};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const BlankImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #22a966;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;
