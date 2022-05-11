import { Router } from "react-router-dom";
import { RouterView } from "./router/RouterView";
import { createBrowserHistory } from "history";
import React, { useState, useEffect } from "react";
import { LoadingScreen } from "./screens/loading-screen/LoadingScreen";
import * as S from "./App.styles";
import axios from "axios";

export const UserContext = React.createContext();

function App() {
  const newHistory = createBrowserHistory();
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/authUser", {
        withCredentials: true,
      })
      .then((res) => {
        setUser({ ...res.data, isLoggedIn: res.data ? true : false });
        setLoading(false);
        clearInterval(requestDataFromServer);
      })
      .catch((err) => {
        console.log(err);
      });
    const requestDataFromServer = setInterval(() => {
      axios
        .get("http://localhost:4000/authUser", {
          withCredentials: true,
        })
        .then((res) => {
          setUser({ ...res.data, isLoggedIn: res.data ? true : false });
          setLoading(false);
          clearInterval(requestDataFromServer);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 10 * 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <Router history={newHistory}>
          <S.PageContent>
            <RouterView />
          </S.PageContent>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
