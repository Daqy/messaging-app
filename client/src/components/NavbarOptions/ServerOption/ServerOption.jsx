import React, { useState, useLayoutEffect } from "react";
import * as S from "./ServerOptions.styles";
import { UnorderedList } from "../UnorderedList/UnorderedList";
import { Notification } from "../../Notifications/Notification";
import { UserContext } from "../../../App.js";
import { Popup } from "../../Popup/Popup";
import AddIcon from "@material-ui/icons/Add";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export const ServerOptions = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [width, height] = useWindowSize();

  const [dispalyPopup, setDispalyPopup] = useState(false);

  function _handleCreateGroup(event) {
    event.preventDefault();
    setDispalyPopup(!dispalyPopup);
  }

  const serverList = user.serverList;
  if (serverList.length > 0) {
    return (
      <>
        <S.Container>
          <S.Title>Servers</S.Title>
          <UnorderedList>
            {serverList.map((server) => {
              return (
                <S.Item key={server.name} to={server.src}>
                  <S.IconContainer>
                    <S.Image src={server.icon}></S.Image>
                  </S.IconContainer>
                  <S.textContainer>
                    <S.Name>{server.name}</S.Name>
                    {server.muted ? (
                      <S.MutedMessage>Muted</S.MutedMessage>
                    ) : (
                      <></>
                    )}
                  </S.textContainer>
                  {server.hasNotification ? (
                    <Notification
                      count={server.notificationCount}
                    ></Notification>
                  ) : (
                    <></>
                  )}
                </S.Item>
              );
            })}
          </UnorderedList>
        </S.Container>
        <S.CreateServerContainer onClick={_handleCreateGroup}>
          {width > 1400 ? (
            <S.CreateServer>Create Server</S.CreateServer>
          ) : (
            <S.SVGContainer>
              <AddIcon />
            </S.SVGContainer>
          )}
        </S.CreateServerContainer>
      </>
    );
  } else {
    return (
      <>
        {dispalyPopup ? (
          <Popup handleClose={_handleCreateGroup}>
            <S.FeatureUnavaliable>
              Sorry But this feature is currently Unavaliable.
            </S.FeatureUnavaliable>
          </Popup>
        ) : (
          <></>
        )}
        <S.CreateServerContainer onClick={_handleCreateGroup}>
          {width > 1400 ? (
            <S.CreateServer>Create Server</S.CreateServer>
          ) : (
            <S.SVGContainer>
              <AddIcon />
            </S.SVGContainer>
          )}
        </S.CreateServerContainer>
      </>
    );
  }
};
