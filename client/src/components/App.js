import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import Chess from "./Chess"

import "../assets/scss/main.scss"

const App = props => {
  return(
    <div>
      <BrowserRouter>
        <Route path ="/" component={Chess} />
      </BrowserRouter>
    </div>
  )
}

export default hot(App)