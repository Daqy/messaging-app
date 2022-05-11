import styled from "styled-components";

export const DisplayMessages = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% + 10px);
  max-width: 1442px;
`;

export const SentByUser = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 5px 0px;
`;

export const SentByOther = styled.div`
  display: flex;
  margin: 5px 0px;
`;

export const ProfileContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50px;
  overflow: hidden;
  margin: ${(props) => (props.left ? `0px 10px 0px 0px` : `0px 0px 0px 10px`)};
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const MessageContainer = styled.div`
  background-color: ${(props) =>
    props.bgColor != null ? props.bgColor : `#565656`};
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 7px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.p`
  margin: 0px;
`;

export const Username = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 17px;
  align-self: ${(props) => (props.user ? "end" : "start")};
`;
