import React, { useState, useLayoutEffect } from "react";
import { UnorderedList } from "../UnorderedList/UnorderedList";
import * as S from "./QuickAccess.styles";
import { Notification } from "../../Notifications/Notification";
import { UserContext } from "../../../App.js";

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

export const QuickAccess = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [width, height] = useWindowSize();

  const quickAccessList = user.quickAccessList;
  if (quickAccessList.length > 0) {
    return (
      <S.Container>
        {width > 1400 ? <S.Title>Quick Access</S.Title> : <></>}

        <UnorderedList>
          {quickAccessList.map((friend, index) => {
            return (
              <S.Item
                key={index}
                to={`/direct-messages/${friend.src}`}
                content={`${friend.name}`}
              >
                <S.IconContainer>
                  <S.Image src={friend.pfp}></S.Image>
                </S.IconContainer>
                {width > 1400 ? (
                  <>
                    <S.textContainer>
                      <S.Name>{friend.name}</S.Name>
                    </S.textContainer>
                    {friend.hasNotification ? (
                      <Notification
                        count={friend.notificationCount}
                      ></Notification>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </S.Item>
            );
          })}
        </UnorderedList>
      </S.Container>
    );
  } else {
    return <></>;
  }
};
