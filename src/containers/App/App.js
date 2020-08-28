import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import AddPage from "../AddPage/AddPage";
import Home from "../Home/Home";
import "./App.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/add" exact component={AddPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
