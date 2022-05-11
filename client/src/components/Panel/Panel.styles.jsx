import styled from "styled-components";

export const Container = styled.div`
  width: 25vw;
  max-width: 450px;
  min-width: 430px;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  :before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #434343;
    opacity: 0.9;
    z-index: -1;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 70px;
  min-height: 70px;
  display: flex;
  align-items: center;
  background-color: #434343;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const Title = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 22px;
  margin-left: 30px;
`;

export const ChatContainer = styled.div`
  width: 100%;
  flex-grow: 100;
  box-sizing: border-box;
  padding: 15px 0px 0px 10px;
  display: flex;
  flex-direction: column;
  max-height: 1200px;
`;
