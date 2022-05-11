import React, { useState, useEffect } from "react";
import * as S from "./GroupChat.styles";
import { DoDecrypt } from "../../encryption/aes";
import { useHistory } from "react-router";
import { UserContext } from "../../App.js";
import { Notification } from "../Notifications/Notification";
import { UnorderedList } from "../NavbarOptions/UnorderedList/UnorderedList";
import { GroupIcon } from "./group-icon/GroupIcon";
import PlusIcon from "@material-ui/icons/Add";
import NeutralIcon from "@material-ui/icons/Remove";
import AddedIcon from "@material-ui/icons/Done";
import RemoveIcon from "@material-ui/icons/Close";
import { Popup } from "../Popup/Popup";

import axios from "axios";
import isWindows from "cross-env/src/is-windows";

export const GroupChat = (props) => {
  const [user, setUser] = React.useContext(UserContext);
  const [groupChatList, setGroupChatList] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [friendsListGroup, setFriendsListGroup] = useState([]);
  const [dispalyPopup, setDispalyPopup] = useState(false);
  const [iconState, setIconState] = useState([]);
  //axios request, get everyserver current user is in (group)
  // const friendsListGroup = [
  //   {
  //     _id: 12354,
  //     name: "jimmy smith",
  //     pfp: "none",
  //   },
  //   {
  //     _id: 1235434,
  //     name: "jimmy smith",
  //     pfp: "none",
  //   },
  // ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/getFriendsListAndgetUserChatList", {
        params: { _id: user._id },
      })
      .then((res) => {
        console.log(res.data);
        setFriendsListGroup(res.data.friends);
        setGroupChatList(res.data.groups);
        let tmp = [];
        res.data.friends.map((friends) => {
          tmp.push({ state: 1 });
        });
        setIconState(tmp);
        console.log(iconState);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function _handleCreateGroup(event) {
    event.preventDefault();
    setDispalyPopup(!dispalyPopup);
  }

  function _sendNewGroup(event) {
    if (groupName.length > 0) {
      let userIds = [];
      userIds.push({
        _id: user._id,
        name: user.name,
        hashtag: user.hashtag,
        pfp: user.pfp,
      });
      iconState.map((state, index) => {
        if (state.state == 2) {
          userIds.push(friendsListGroup[index]);
        }
      });
      if (userIds.length > 1) {
        axios
          .post("http://localhost:4000/createGroup", {
            name: groupName,
            users: userIds,
          })
          .then((res) => {
            console.log(res.data);
            setGroupChatList(res.data);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("add atleast one person");
      }
    } else {
      console.log("enter a group name");
    }
  }

  function _handleIconDisplay(event, index1) {
    let tmp = [];

    iconState.map((state, index) => {
      if (index1 == index) {
        tmp.push({ state: state.state + 1 > 2 ? 1 : state.state + 1 });
      } else {
        tmp.push(state);
      }
    });
    setIconState(tmp);
  }

  return (
    <>
      <UnorderedList
        listStyle="overflow-y: scroll;width: 100%;margin-bottom: 0px;"
        hoverStyles="box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
      >
        {groupChatList.map((groupChat, index) => {
          return (
            <S.ChatItem key={index} to={`/direct-messages/${groupChat.src}`}>
              <GroupIcon users={groupChat.users}></GroupIcon>
              <S.TextContainer>
                <S.Username>{groupChat.name}</S.Username>
                <S.PreviousMessage>
                  {DoDecrypt(groupChat.latestMessage).length > 32
                    ? `${DoDecrypt(groupChat.latestMessage).substring(
                        0,
                        32
                      )}...`
                    : DoDecrypt(groupChat.latestMessage)}
                </S.PreviousMessage>
              </S.TextContainer>
              {groupChat.hasNotifcation ? (
                <Notification
                  count={groupChat.notificationCount}
                ></Notification>
              ) : (
                <></>
              )}
            </S.ChatItem>
          );
        })}
      </UnorderedList>
      {dispalyPopup ? (
        <Popup handleClose={_handleCreateGroup}>
          <S.popContentContainer>
            <S.GroupNameInput
              placeholder="Enter Group name..."
              value={groupName}
              onInput={(e) => setGroupName(e.target.value)}
            />
            <S.FriendsListContainer>
              {friendsListGroup.map((friend, index) => {
                return (
                  <S.Friend key={friend._id}>
                    <S.FriendProfilePictureContainer>
                      <S.FriendImage src={friend.pfp}></S.FriendImage>
                    </S.FriendProfilePictureContainer>
                    <S.FriendtextContainer>
                      <S.FriendName>{friend.name}</S.FriendName>
                    </S.FriendtextContainer>
                    <S.AddToGroupButton
                      onClick={(event) => _handleIconDisplay(event, index)}
                      state={iconState.length > 0 ? iconState[index].state : 0}
                    >
                      {iconState.length > 0 ? (
                        iconState[index].state == 1 ? (
                          <NeutralIcon />
                        ) : (
                          <AddedIcon />
                        )
                      ) : (
                        <></>
                      )}
                    </S.AddToGroupButton>
                  </S.Friend>
                );
              })}
            </S.FriendsListContainer>
            <S.SubmitGroup onClick={_sendNewGroup}>Create Group</S.SubmitGroup>
          </S.popContentContainer>
        </Popup>
      ) : (
        <></>
      )}
      <S.CreateGroupContainer>
        <S.CreateGroupButton>
          <PlusIcon />
          <S.ButtonText onClick={(event) => _handleCreateGroup(event)}>
            Create Group
          </S.ButtonText>
        </S.CreateGroupButton>
      </S.CreateGroupContainer>
    </>
  );
};
