import React, { useState } from "react";
import MainMenuSolo from "./MainMenuSolo";

const MainMenu = ({currentUser}) => {
  const [ showSubMenu, setShowSubMenu ] = useState(false)

  const showSoloMenu = event => {
    event.preventDefault()
    showSubMenu !== "solo" ? setShowSubMenu("solo") : setShowSubMenu(false)
  }

  let subMenu
  if (showSubMenu === "solo") {
    subMenu=<MainMenuSolo currentUser={currentUser} />
  }

  return (
    <div className="centered-content">
      <h1 className="main-menu--header">Welcome to the Chess App!</h1>
      <a href="#" onClick={showSoloMenu} className="main-menu--item">Play Solo</a>
      {subMenu}
    </div>
  )
}

export default MainMenu