import React, { useEffect, useState } from "react";
import * as S from "./Chat.styles";
import io from "socket.io-client";
import { useHistory } from "react-router";
import { Messages } from "./Messages";
import { UserContext } from "../../App.js";
import { Loading } from "../Loading/Loading";

import { DoEncrypt } from "../../encryption/aes";

import SendIcon from "@material-ui/icons/Send";

export const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = React.useContext(UserContext);
  const [input, setInput] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  const history = useHistory();

  useEffect(() => {
    setCurrentPath(history.location.pathname.split("/"));
    if (
      !history.location.pathname.includes(user._id) &&
      !history.location.pathname.includes("groups")
    ) {
      history.push("/direct-messages");
    }
    const tempValue = history.location.pathname.split("/");
    const newSocket = io(`http://${window.location.hostname}:4000`);
    if (tempValue.length === 4) {
      newSocket.emit("join-room", {
        userid: tempValue[2],
        otherid: tempValue[3],
        _id: user._id,
      });
    }
    setSocket(newSocket);
    return history.listen((location) => {
      newSocket.emit("leave-room");
      setInput("");
      setCurrentPath(location.pathname.split("/"));
      if (location.pathname.includes("direct-messages")) {
        const path = location.pathname.split("/");
        if (path.length === 4) {
          newSocket.emit("join-room", {
            userid: path[2],
            otherid: path[3],
            _id: user._id,
          });
        }
        setSocket(newSocket);
      } else {
        newSocket.close();
      }
    });
  }, [setSocket]);

  function _handleKeyDown(event) {
    if (event.key === "Enter") {
      emitMessageFunction();
    }
  }
  function _sendMessage(event) {
    emitMessageFunction();
  }

  function emitMessageFunction() {
    let otherid = null;
    let sendMessageUrl = window.location.pathname.split("/");

    user.chatList.map((chats) => {
      if (chats.src == `${sendMessageUrl[2]}/${sendMessageUrl[3]}`) {
        otherid = chats._id;
      }
    });

    if (input.length > 0) {
      socket.emit("sendMessage", {
        message: DoEncrypt(input),
        _id: user._id,
        userid: user._id,
        otherid: otherid,
        date: new Date(),
        chatid: `${sendMessageUrl[2]}/${sendMessageUrl[3]}`,
      });
      setInput("");
    }
  }

  return (
    <>
      {socket != null && currentPath.length > 3 ? (
        <S.ChatContainer>
          <S.MessageContainer>
            <Messages socket={socket} />
          </S.MessageContainer>
          <S.InputContainer>
            <S.Input
              onKeyUp={_handleKeyDown}
              placeholder="Send Message..."
              value={input}
              onInput={(e) => setInput(e.target.value)}
            ></S.Input>
            <S.SendButton>
              <SendIcon onClick={_sendMessage} />
            </S.SendButton>
          </S.InputContainer>
        </S.ChatContainer>
      ) : (
        <Loading message={"Trying to load chat"} />
      )}
    </>
  );
};
