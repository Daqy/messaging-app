import React, { useState } from "react";
import { UserContext } from "../../App.js";
import * as S from "./AddFriends.styles";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import AddFriendIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";

export const AddFriend = () => {
  const [user, setUser] = React.useContext(UserContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setsearchResult] = useState([]);

  function _handleAddingFriend(event, index) {
    axios
      .post("http://localhost:4000/friendRequestSent", {
        sentByID: user._id,
        friendTobeID: searchResult[index]._id,
      })
      .then((res) => {
        setUser({ ...res.data, isLoggedIn: user.isLoggedIn });
        sendSearchQuery();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function _searchForUser(event) {
    sendSearchQuery();
  }

  function _handleKeyDown(event) {
    //add pending request + sent request
    if (event.key === "Enter") {
      sendSearchQuery();
    }
  }

  function sendSearchQuery() {
    const data = searchInput.split("#");
    if (data.length == 2 && data[1].length == 4) {
      if (
        data[0].toLowerCase() == user.name.toLowerCase() &&
        data[1] == user.hashtag
      ) {
        console.log("cant add yourself :)");
        setsearchResult([]);
      } else {
        axios
          .get(`http://localhost:4000/searchUser`, {
            params: { searchQuery: searchInput, id: user._id },
          })
          .then((res) => {
            setsearchResult([{ ...res.data }]);
            // setUser({ ...res.data, isLoggedIn: user.isLoggedIn });
            // do something with returned value
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log("search query incorrect.");
      setsearchResult([]);
    }
  }

  // for (let i = 0; i < 150; i++) {
  //   searchResult.push({
  //     name: "John Smith",
  //     hashTag: "4321",
  //     isFriend: false,
  //     hasRequestSent: false,
  //     pfp: "none",
  //   });
  // }

  return (
    <S.Container>
      <S.AddFriendMainContainer>
        <S.SearchContainer>
          <S.Search
            placeholder="Enter a Username#0000"
            onKeyDown={_handleKeyDown}
            value={searchInput}
            onInput={(e) => setSearchInput(e.target.value)}
          ></S.Search>
          <S.SearchIconContainer>
            <SearchIcon onClick={_searchForUser} />
          </S.SearchIconContainer>
        </S.SearchContainer>
        <S.SearchResultContainer>
          {searchResult.map((user, index) => {
            return (
              <S.SearchResult key={user._id}>
                <S.UserProfileContainer>
                  <S.Imagine src={user.pfp}></S.Imagine>
                </S.UserProfileContainer>
                <S.TextContainer>
                  <S.Text>{user.name}</S.Text>
                  <S.HashTag>#{user.hashtag}</S.HashTag>
                </S.TextContainer>
                <S.AddFriendContainer>
                  {user.hasRequestSent ? (
                    <S.FriendText>Friend Request Sent</S.FriendText>
                  ) : user.isFriend ? (
                    <S.FriendText>Already friends</S.FriendText>
                  ) : (
                    <AddFriendIcon
                      onClick={(event) => _handleAddingFriend(event, index)}
                    />
                  )}
                </S.AddFriendContainer>
              </S.SearchResult>
            );
          })}
        </S.SearchResultContainer>
      </S.AddFriendMainContainer>
    </S.Container>
  );
};
