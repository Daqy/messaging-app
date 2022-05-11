import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DirectMessages } from "../screens/direct-messages/DirectMessages";
import { LoginScreen } from "../screens/login-screen/LoginScreen";
import { FriendsList } from "../screens/friends-list/FriendsList";
import { AddFriend } from "../screens/add-friends/AddFriend";
import { FriendRequest } from "../screens/friend-requests/FriendRequest";
import { UserContext } from "../App.js";
import { Nav } from "../components/Nav/Nav";

export const RouterView = () => {
  const [user, setUser] = React.useContext(UserContext);

  if (!user.isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" render={(props) => <LoginScreen {...props} />} />
        <Redirect from="/" to="/login" />
      </Switch>
    );
  } else {
    return (
      <>
        <Nav />
        <Switch>
          <Route path="/direct-messages/:id?/:id2?">
            <DirectMessages />
          </Route>
          <Route path="/friends-list">
            <FriendsList />
          </Route>
          <Route path="/add-friends">
            <AddFriend />
          </Route>
          {user.request.pending.length > 0 ? (
            <Route path="/friend-requests">
              <FriendRequest />
            </Route>
          ) : (
            <></>
          )}
          <Redirect from="/" to="/direct-messages" />
        </Switch>
      </>
    );
  }
};
