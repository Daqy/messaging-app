import styled from "styled-components";

export const ChatContainer = styled.div`
  flex-grow: 100;
  display: flex;
  flex-direction: column;
`;

export const MessageContainer = styled.div`
  flex-grow: 100;
  display: flex;
  flex-direction: column-reverse;
  box-sizing: border-box;
  padding: 0px calc(5% - 2px) 0px 5%;
  max-height: calc(100vh - 50px);
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: #252525 transparent;
  scrollbar-gutter: stable;

  ::-webkit-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
`;

export const InputContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Input = styled.input`
  border: none;
  width: 90%;
  height: 70%;
  max-height: 45px;
  min-height: 40px;
  background-color: #565656;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  box-sizing: border-box;
  padding: 0px 55px 0px 15px;

  :focus {
    border: none;
    outline: none;
  }
`;

export const SendButton = styled.div`
  position: absolute;
  top: 9.5px;
  right: 6%;
  border-radius: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    font-size: 25px;
    color: #afafaf;
  }

  > svg:hover {
    color: white !important;
    cursor: pointer;
  }
`;
