import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 40px;
`;

export const Item = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #eaeaec;
  padding: 7px 10px;
`;

export const Title = styled.p`
  color: #c4c4c4;
  font-weight: bold;
  margin: 0px;
  margin-left: 15px;
`;

const imageSize = "35px";

export const IconContainer = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 5px;
  background-color: black;
  overflow: hidden;
  margin-right: 15px;
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
`;

export const MutedMessage = styled.p`
  padding: 0px;
  margin: 0px;
  color: #c4c4c4;
  font-size: 12px;
`;

export const CreateServerContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0px 0px 0px !important;
  border-radius: 5px;

  :hover {
    background-color: #474747;
    cursor: pointer;
  }
  @media (max-width: 1400px) {
    :hover:after {
      content: "Create Server";
      padding: 4px 8px;
      position: absolute;
      left: 90px;
      white-space: nowrap;
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const CreateServer = styled.p`
  padding: 10px;
  font-weight: bold;
  margin: 0px;
`;

export const FeatureUnavaliable = styled.p`
  margin: 0px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; ;
`;

export const SVGContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: 80%;
    height: 80%;
    color: #c4c4c4;
  }
`;
