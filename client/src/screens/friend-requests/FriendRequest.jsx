import React, { useState } from "react";
import { UserContext } from "../../App.js";
import * as S from "./FriendRequest.styles";
// import SearchIcon from "@material-ui/icons/SearchOutlined";
import AcceptIcon from "@material-ui/icons/Done";
import DeclineIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";
import axios from "axios";

export const FriendRequest = () => {
  const [user, setUser] = React.useContext(UserContext);

  const pendingRequest = user.request.pending;

  const history = useHistory();

  function _handleButton(event, option, index) {
    axios
      .post("http://localhost:4000/responseToRequest", {
        response: option,
        currentUserID: user._id,
        friendID: pendingRequest[index]._id,
      })
      .then((res) => {
        history.push("/friends-list");
        window.location.reload();
        // setUser({ ...res.data, isLoggedIn: user.isLoggedIn });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <S.Container>
      <S.PendingListMainContainer>
        <S.TitleContainer>Pending Requests</S.TitleContainer>
        <S.PendingListContainer>
          {pendingRequest.map((friend, index) => {
            return (
              <S.Item key={friend._id}>
                <S.IconContainer>
                  <S.Image src={friend.pfp} />
                </S.IconContainer>
                <S.TextContainer>
                  <S.Text>{friend.name}</S.Text>
                  <S.HashTag>#{friend.hashtag}</S.HashTag>
                </S.TextContainer>
                <S.AcceptContainer
                  onClick={(event) => _handleButton(event, "accept", index)}
                >
                  <AcceptIcon />
                </S.AcceptContainer>
                <S.DeclineContainer
                  onClick={(event) => _handleButton(event, "decline", index)}
                >
                  <DeclineIcon />
                </S.DeclineContainer>
              </S.Item>
            );
          })}
        </S.PendingListContainer>
      </S.PendingListMainContainer>
    </S.Container>
  );
};
