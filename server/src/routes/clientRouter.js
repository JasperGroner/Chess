import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = ["/", "/chess", "/chess/new", "/lobby", "/users/new", "/user-sessions/new"]

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
