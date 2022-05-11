import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 40px;
  @media (max-width: 1400px) {
    margin-top: 10px;
  }
`;

export const Item = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #eaeaec;
  padding: 7px 10px;
  display: flex;

  @media (max-width: 1400px) {
    justify-content: center;
    align-items: center;
    :hover:after {
      ${(props) =>
        props.content
          ? `content: "${props.content}"`
          : `content: "Insert username"`};
      padding: 4px 8px;
      position: absolute;
      left: calc(100% + 20px);
      white-space: nowrap;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Title = styled.p`
  color: #c4c4c4;
  font-weight: bold;
  margin: 0px;
  margin-left: 15px;
`;

const imageSize = "30px";

export const IconContainer = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 100px;
  background-color: black;
  overflow: hidden;
  margin-right: 15px;

  @media (max-width: 1400px) {
    margin: 0px;
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 100%;
`;

export const textContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.p`
  padding: 0px;
  margin: 0px;
  color: white;
  font-size: 14px;
  @media (max-width: 1400px) {
    display: none;
  }
`;
