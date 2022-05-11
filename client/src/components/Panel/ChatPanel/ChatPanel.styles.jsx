import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 25vw;
  max-width: 450px;
  min-width: 430px;
  height: 100vh;
  position: relative;

  :after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #434343;
    opacity: 0.9;
  }
`;

export const childTobeFlex = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;

  > :first-child {
    display: flex;
    flex-grow: 100;
  }
`;

export const ChatItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const imageSize = "45px";

export const IconContainer = styled.div`
  width: ${imageSize};
  height: ${imageSize};
  border-radius: 50px;
  background-color: black;
  overflow: hidden;
  margin-right: 15px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const TextContainer = styled.div`
  > p {
    margin: 0px;
  }
`;
export const Username = styled.p`
  font-weight: bold;
`;

export const PreviousMessage = styled.p`
  color: #c4c4c4;
  font-size: 15px;
`;

export const chatTypeContainer = styled.div`
  .active {
    color: white !important;
  }
`;
export const Options = styled.ul`
  margin: 0px;
  padding: 0px;
  display: flex;
  margin-left: 30px;
`;
export const Option = styled.li`
  list-style: none;
  padding: 5px;

  a {
    color: #c4c4c4;
  }
  a:hover {
    color: white;
  }
`;
export const Text = styled.p`
  font-weight: bold;
  color: #c4c4c4;
  :hover {
    cursor: pointer;
  }
`;
