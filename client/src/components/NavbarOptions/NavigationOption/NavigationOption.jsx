import React from "react";
import * as S from "./NavigationOption.styles";
import { UnorderedList } from "../UnorderedList/UnorderedList";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import MessageIcon from "@material-ui/icons/Message";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import AddFriendIcon from "@material-ui/icons/PersonAdd";
import RequestIcon from "@material-ui/icons/AccountBox";
import axios from "axios";
import { UserContext } from "../../../App.js";

export const NavigationOptions = () => {
  const [user, setUser] = React.useContext(UserContext);

  function _handleLogout(event) {
    console.log("logout?");
    axios
      .post("http://localhost:4000/logout", {
        sessionID: document.cookie.split("=")[1].split(".")[0],
      })
      .then((res) => {
        console.log("log out", res);
        document.cookie.split(";").forEach(function (c) {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });
        window.location.href = "http://localhost:3000/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <UnorderedList>
      <S.Item to={"/add-friends"} content="Add friend">
        <AddFriendIcon />
        <S.Text>Add friend</S.Text>
      </S.Item>
      <S.Item to={"/direct-messages"} content="Direct Messages">
        <MessageIcon />
        <S.Text>Direct Messages</S.Text>
      </S.Item>
      <S.Item to={"/friends-list"} content="Friends List">
        <PeopleAltOutlinedIcon />
        <S.Text>Friends List</S.Text>
      </S.Item>
      {user.request.pending.length > 0 ? (
        <S.Item to={"/friend-requests"} content="Friend Requests">
          <RequestIcon />
          <S.Text>Friend Requests</S.Text>
        </S.Item>
      ) : (
        <></>
      )}

      {/* <S.Item to={"test"}>
        <SettingsOutlinedIcon />
        Settings
      </S.Item> */}
      <S.Item to={"/"} onClick={_handleLogout} content="Logout">
        <LogoutIcon />
        <S.Text>Logout</S.Text>
      </S.Item>
    </UnorderedList>
  );
};
