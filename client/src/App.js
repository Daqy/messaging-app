import { Router } from "react-router-dom";
import { Nav } from "./components/navbar/Nav";
import { RouterView } from "./router/RouterView";
import { createBrowserHistory } from "history";

function App() {
  const newHistory = createBrowserHistory();

  return (
    <div className="App">
      <Router history={newHistory}>
        <Nav />
        <RouterView />
      </Router>
    </div>
  );
}

export default App;
