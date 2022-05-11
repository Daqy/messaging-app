import React from "react";
import { ChatPanel } from "../../components/Panel/ChatPanel/ChatPanel";
import { Chat } from "../../components/Chat/Chat";
import { UserContext } from "../../App.js";

// import { Link } from "react-router-dom";
import * as S from "./DirectMessages.styles";

export const DirectMessages = () => {
  const [user, setUser] = React.useContext(UserContext);

  return (
    <S.Container>
      <ChatPanel user={user}></ChatPanel>
      <Chat></Chat>
    </S.Container>
  );
};
