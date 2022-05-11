import React, { useEffect, useState } from "react";
import * as S from "./Messages.styles";
import { UserContext } from "../../App.js";
import { useHistory } from "react-router";
import axios from "axios";
import { DoDecrypt } from "../../encryption/aes";

export const Messages = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = React.useContext(UserContext);
  const [otherPfp, setOtherPfp] = useState("");
  const [groupProfile, setGroupProfile] = useState([]);
  var previousSender = "";

  const history = useHistory();

  useEffect(() => {
    const pathname = history.location.pathname;
    console.log(pathname.split("/").includes("groups"));
    if (pathname.split("/").includes("groups")) {
      console.log("run");
      const src = `${pathname.split("/")[2]}/${pathname.split("/")[3]}`;
      axios
        .get("http://localhost:4000/groupUserProfiles", {
          params: { _id: user._id, src: src },
        })
        .then((res) => {
          console.log("response", res.data);
          let tmp = [];
          res.data[0].users.map((_user) => {
            tmp.push({ _id: _user._id, pfp: _user.pfp });
          });
          setGroupProfile(tmp);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const id =
        pathname.split("/")[2] == user._id
          ? pathname.split("/")[3]
          : pathname.split("/")[2];
      axios
        .get("http://localhost:4000/getUserPfp", { params: { _id: id } })
        .then((res) => {
          setOtherPfp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    socket.on("message", (Messages) => {
      setMessages(Messages);
    });

    return () => {
      socket.off("message", (Messages) => {
        setMessages(Messages);
      });
    };
  }, [socket]);

  function sendAxiosAgain() {
    const pathname = history.location.pathname;
    const src = `${pathname.split("/")[2]}/${pathname.split("/")[3]}`;

    axios
      .get("http://localhost:4000/groupUserProfiles", {
        params: { _id: user._id, src: src },
      })
      .then((res) => {
        console.log("response", res.data);
        let tmp = [];
        res.data[0].users.map((_user) => {
          tmp.push({ _id: _user._id, pfp: _user.pfp });
        });
        setGroupProfile(tmp);
      })
      .catch((err) => {
        console.log(err);
      });
    return "";
  }

  return (
    <S.DisplayMessages>
      {messages ? (
        messages.map((message, index) => {
          if (message.sender_ID == user._id) {
            return (
              <div key={index}>
                <S.SentByUser>
                  <S.ProfileContainer>
                    <S.Image src={user.pfp}></S.Image>
                  </S.ProfileContainer>
                  <S.MessageContainer bgColor={"#22a966"}>
                    <S.Username user={true}>{user.name}</S.Username>
                    <S.Message>{DoDecrypt(message.message)}</S.Message>
                  </S.MessageContainer>
                </S.SentByUser>
                {messages[index + 1 > messages.length - 1 ? index : index + 1]
                  .sender_ID != null &&
                messages[index + 1 > messages.length - 1 ? index : index + 1]
                  .sender_ID != user._id ? (
                  <br />
                ) : (
                  <></>
                )}
              </div>
            );
          } else {
            return (
              <div key={index}>
                <S.SentByOther>
                  <S.ProfileContainer left={true}>
                    <S.Image
                      src={
                        otherPfp
                          ? otherPfp
                          : groupProfile.length > 0
                          ? index < groupProfile.length
                            ? groupProfile[index].pfp
                            : sendAxiosAgain()
                          : ""
                      }
                    />
                  </S.ProfileContainer>
                  <S.MessageContainer>
                    <S.Username>{message.username}</S.Username>
                    <S.Message>{DoDecrypt(message.message)}</S.Message>
                  </S.MessageContainer>
                </S.SentByOther>
                {messages[index + 1 > messages.length - 1 ? index : index + 1]
                  .sender_ID != undefined &&
                messages[index + 1 > messages.length - 1 ? index : index + 1]
                  .sender_ID == user._id ? (
                  <br />
                ) : (
                  <></>
                )}
              </div>
            );
          }
        })
      ) : (
        <></>
      )}
    </S.DisplayMessages>
  );
};
