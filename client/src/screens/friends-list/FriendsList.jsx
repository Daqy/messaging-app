import React from "react";
// import { Chat } from "../../components/Chat/Chat";
import { UserContext } from "../../App.js";
import QuickAccessTrue from "@material-ui/icons/Star";
import QuickAccessFalse from "@material-ui/icons/StarBorder";
// import { Link } from "react-router-dom";
import * as S from "./FriendsList.styles";
import axios from "axios";

export const FriendsList = () => {
  const [user, setUser] = React.useContext(UserContext);
  const friendslist = user.friendsList;
  // for (let i = 0; i < 150; i++) {
  //   friendslist.push({ name: "John Smith", pfp: "none" });
  // }
  function _handleRemovingAccess(event, index) {
    axios
      .post("http://localhost:4000/removeUserToQuickAccess", {
        currentuserId: user._id,
        otherUser: friendslist[index],
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function _handleAddingAccess(event, index) {
    axios
      .post("http://localhost:4000/addUserToQuickAccess", {
        currentuserId: user._id,
        otherUser: friendslist[index],
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <S.Container>
      <S.FriendsListContainer>
        <S.TitleContainer>Friends List</S.TitleContainer>
        <S.FriendList>
          {friendslist.map((friend, index) => {
            return (
              <S.Item key={friend._id}>
                <S.IconContainer>
                  <S.Image src={friend.pfp} />
                </S.IconContainer>
                <S.TextContainer>
                  <S.Username>{friend.name}</S.Username>
                </S.TextContainer>
                <S.QuickAccess>
                  {friend.isQuickAccess ? (
                    <S.FillGreen>
                      <QuickAccessTrue
                        onClick={(event) => _handleRemovingAccess(event, index)}
                      />
                    </S.FillGreen>
                  ) : (
                    <QuickAccessFalse
                      onClick={(event) => _handleAddingAccess(event, index)}
                    />
                  )}
                </S.QuickAccess>
              </S.Item>
            );
          })}
        </S.FriendList>
      </S.FriendsListContainer>
    </S.Container>
  );
};
