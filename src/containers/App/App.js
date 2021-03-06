import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Header from "../../components/Header/Header";
import AddPage from "../AddPage/AddPage";
import Home from "../Home/Home";
import Subject from "../Subject/Subject";
import "./App.css";
import EditPage from "../EditPage/EditPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/add" exact component={AddPage} />
          <Route path="/post/:id" exact component={Subject} />
          <Route path="/post/:id/edit" component={EditPage} ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
