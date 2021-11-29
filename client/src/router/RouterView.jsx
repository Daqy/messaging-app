import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { DirectMessages } from "../screens/direct-messages/DirectMessages";

export const RouterView = () => {
  return (
    <Switch>
      <Redirect from="/" to="/direct-messages" />
      <Route path="/direct-messages" component={DirectMessages} />
    </Switch>
  );
};
