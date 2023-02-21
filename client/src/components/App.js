import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import Board from "./board/Board"
import MainMenu from "./menus/MainMenu"
import NewGameForm from "./menus/NewGameForm";
import Lobby from "./Lobby"
import Chat from "./chat/Chat"

const App = props => {
  const [ currentUser, setCurrentUser ] = useState(undefined);
  const [ menuHidden, setMenuHidden ] = useState(true);
  const [ chatSocket, setChatSocket ] = useState(null)

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }
  
  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const swapMenuDisplay = () => {
    menuHidden === false ? setMenuHidden(true) : setMenuHidden(false)
  }

  let showHide="button-menu--show"
  if (!menuHidden) {
    showHide="button-menu--hide"
  }

  let chatDisplay
  if (chatSocket) {
    chatDisplay = <Chat socket={chatSocket}/>
  }

  return (
    <Router>
      <div className="page-container">
        <button className={`button button-menu ${showHide}`} onClick={swapMenuDisplay}><i className="fa-solid fa-bars"></i></button>
        <TopBar user={currentUser} hidden={menuHidden}/>
          <Switch>
            <Route exact path="/"
              render={props => <MainMenu {...props} currentUser={currentUser} />}
            />
            <Route exact path="/chess" 
              render={props => <Board {...props} currentUser={currentUser} setChatSocket={setChatSocket}/>} 
            />
            <Route exact path="/chess/new"
              render={props => <NewGameForm {...props} currentUser={currentUser} />}
            />
            <Route exact path="/lobby"
              render={props => <Lobby {...props} currentUser={currentUser} setChatSocket={setChatSocket}/>}
            />
            <Route exact path="/users/new" component={RegistrationForm} />
            <Route exact path="/user-sessions/new" component={SignInForm} />
          </Switch>
        {chatDisplay}
      </div>
    </Router>
  );
};

export default hot(App);
