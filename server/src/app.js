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
import { createServer, get } from "http"
import { Server } from "socket.io"
import { Game, GameState, Player } from "./models/index.js"
import GameStateSerializer from "./serializers/GameStateSerializer.js"
import GameSerializer from "./serializers/GameSerializer.js"
import getAvailableGames from "./services/getAvailableGames.js"

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

  socket.on("join lobby", async () => {
    console.log("joining lobby")
    socket.join("lobby")
  })

  socket.on("leave lobby", async () => {
    socket.leave("lobby")
  })

  socket.on("get available games", async () => {
    socket.emit("available games", {games: await getAvailableGames()})
  })

  socket.on("update available games", async () => {
    io.emit("available games", {games: await getAvailableGames()}) 
  })

  socket.on("join game", async ({ gameId, availableColor }) => {
    console.log("joining " + gameId)
    const userId = socket.request.user.id
    const game = await Game.query().patchAndFetchById(gameId, {
      status: "playing"
    })
    const player = await Player.query().insert({gameId, userId, color: availableColor})
    io.to("lobby").emit("game starting", ({startingGame: game}))
  })

  socket.on("load game", async ({ gameId }) => {
    console.log("loading " + gameId)
    socket.join(gameId)
    const game = await Game.query().patchAndFetchById(gameId, {
      status: "playing"
    })
    const gameStates = await game.$relatedQuery("gameStates")
    const serializedGameState = GameStateSerializer.getMostRecentDetail(gameStates)
    io.to(gameId).emit("load game", ({game: serializedGameState}))
  })

  socket.on("leave game", async({gameId, status}) => {
    socket.leave(gameId)
    const patchedGame = await Game.query().patchAndFetchById(gameId, {
      status: status
    })
  })

  socket.on("game state", async ({ gameId, encodedState }) => {
    const body = {gameId, encodedState}
    const newGameState = await GameState.query().insert(body)
  })

  socket.on("turn switch",({ response, gameId }) => {
    io.to(gameId).emit("turn switch", {response})
  })

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected")
  })
})

httpServer.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...")
})

export default app
