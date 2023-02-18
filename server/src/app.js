import express from "express"
import path from "path"
import logger from "morgan"
import bodyParser from "body-parser"
import { fileURLToPath } from "url"
import "./boot.js"
import configuration from "./config.js"
import addMiddlewares from "./middlewares/addMiddlewares.js"
import addMiddlewaresIO from "./middlewares/addMiddlewaresIO.js"
import rootRouter from "./routes/rootRouter.js"
import hbsMiddleware from "express-handlebars"
import { createServer } from "http"
import { Server } from "socket.io"
import { Game, GameState } from "./models/index.js"
import GameStateSerializer from "./serializers/GameStateSerializer.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const httpServer = createServer( app )
const io = new Server(httpServer)

app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs",
  })
)
app.set("view engine", "hbs")
app.use(logger("dev"))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
addMiddlewares(app)
app.use(rootRouter)

addMiddlewaresIO(io)

io.on("connection", (socket) => {
  console.log(socket.id + " connected")

  socket.on("load game", async ({gameId}) => {
    const game = await Game.query().findById(gameId)
    const gameStates = await game.$relatedQuery("gameStates")
    const serializedGame = GameStateSerializer.getMostRecentDetail(gameStates)
    socket.emit("load game", ({game: serializedGame}))
  })

  socket.on("game state", async ({ gameId, encodedState }) => {
    const body = {gameId, encodedState}
    const newGameState = await GameState.query().insert(body)
  })

  socket.on("turn switch",({ response }) => {
    socket.broadcast.emit("turn switch", {response})
  })

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected")
  })
})

httpServer.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...")
})

export default app
