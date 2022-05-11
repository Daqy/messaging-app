import React, { useEffect, useState } from "react";
import { Panel } from "../Panel";
import * as S from "./ChatPanel.styles";
import { UnorderedList } from "../../NavbarOptions/UnorderedList/UnorderedList";
import { Notification } from "../../Notifications/Notification";
import { UserContext } from "../../../App.js";
import { DoDecrypt } from "../../../encryption/aes";
import { useHistory } from "react-router";
import { GroupChat } from "../../group-chats/GroupChat";

export const ChatPanel = (props) => {
  const [user, setUser] = React.useContext(UserContext);
  const [currentPanel, setCurrentPanel] = useState("direct");

  const history = useHistory();

  useEffect(() => {
    const pathname = history.location.pathname;
    if (pathname.includes("groups")) {
      setCurrentPanel("groups");
    }
    console.log(pathname);
  }, []);

  const chatList = user.chatList;

  function _handleNewActive(event, name) {
    setCurrentPanel(name);
  }

  return (
    <Panel title={"Direct Messages"}>
      <S.chatTypeContainer>
        <S.Options>
          <S.Option>
            <S.Text
              onClick={(event) => _handleNewActive(event, "direct")}
              className={currentPanel == "direct" ? "active" : ""}
            >
              Direct
            </S.Text>
          </S.Option>
          <S.Option>
            <S.Text
              onClick={(event) => _handleNewActive(event, "groups")}
              className={currentPanel == "direct" ? "" : "active"}
            >
              Groups
            </S.Text>
          </S.Option>
        </S.Options>
      </S.chatTypeContainer>
      <S.childTobeFlex>
        {currentPanel == "direct" ? (
          <UnorderedList
            listStyle="overflow-y: scroll;width: 100%;margin-bottom: 0px;"
            hoverStyles="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
          >
            {chatList.map((chats, index) => {
              return (
                <S.ChatItem key={index} to={`/direct-messages/${chats.src}`}>
                  <S.IconContainer>
                    <S.Image src={chats.pfp} />
                  </S.IconContainer>
                  <S.TextContainer>
                    <S.Username>{chats.name}</S.Username>

                    <S.PreviousMessage>
                      {DoDecrypt(chats.latestMessage).length > 32
                        ? `${DoDecrypt(chats.latestMessage).substring(
                            0,
                            32
                          )}...`
                        : DoDecrypt(chats.latestMessage)}
                    </S.PreviousMessage>
                  </S.TextContainer>
                  {chats.hasNotifcation ? (
                    <Notification
                      count={chats.notificationCount}
                    ></Notification>
                  ) : (
                    <></>
                  )}
                </S.ChatItem>
              );
            })}
          </UnorderedList>
        ) : (
          <GroupChat></GroupChat>
        )}
      </S.childTobeFlex>
    </Panel>
  );
};
