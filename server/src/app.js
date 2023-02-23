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
const io = 
  process.env.NODE_ENV === "development"
    ? new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      },
    })
    : new Server(httpServer, {
      cors: {
        origin: "https://chess-game.herokuapp.com/",
        methods: ["GET", "POST"]
      }
    })


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

  socket.on("join lobby", () => {
    socket.join("lobby")
  })

  socket.on("leave lobby", async ({ gameId }) => {
    if (gameId) {
      const game = await Game.query().findById(gameId)
      if (game?.status === "looking") {
        await Game.query().deleteById(gameId)
      }
    }
    io.emit("available games", {games: await getAvailableGames()}) 
  })

  socket.on("get available games", async () => {
    socket.emit("available games", {games: await getAvailableGames()})
  })

  socket.on("update available games", async () => {
    io.emit("available games", {games: await getAvailableGames()}) 
  })

  socket.on("delete game", async ({ gameId }) => {
    await Game.query().deleteById(gameId)
  })

  socket.on("join game", async ({ gameId, availableColor }) => {
    const userId = socket.request.user.id
    const game = await Game.query().patchAndFetchById(gameId, {
      status: "playing"
    })
    const player = await Player.query().insert({gameId, userId, color: availableColor})
    const serializedGame = await GameSerializer.getDetail(game)
    io.to("lobby").emit("game starting", ({startingGame: serializedGame}))
  })

  socket.on("load game", async ({ gameId }) => {
    socket.join(gameId)
    const game = await Game.query().findById(gameId)
    if (game.status === "looking") {
      await game.$query().patch({status: "playing"})
    }
    const gameStates = await game.$relatedQuery("gameStates").orderBy("createdAt")
    let serializedGameState
    if (game.status !== "finished") {
      serializedGameState = gameStates[gameStates.length - 1]
    } else {
      serializedGameState = gameStates[0]
    }
    io.to(gameId).emit("load game", ({gameData: serializedGameState}))
  })

  socket.on("game state", async ({ gameId, encodedState }) => {
    const body = {gameId, encodedState}
    const newGameState = await GameState.query().insert(body)
  })

  socket.on("turn switch",({ response, gameId }) => {
    io.to(gameId).emit("turn switch", {response})
  })

  socket.on("checkmate", async ({gameId, winner}) => {
    if (gameId && winner) {
      const patchedGame = await Game.query().patchAndFetchById(gameId, {
        status: "finished",
        winner: winner
      })
    }
  })

  socket.on("leave game", ({gameId}) => {
    socket.leave(gameId)
  })

  socket.on("get replay states", async ({gameId}) => {
    const finishedGame = await Game.query().findById(gameId)
    const gameStates = await finishedGame.$relatedQuery("gameStates").orderBy("createdAt")
    const serializedGameStates = GameStateSerializer.getSummary(gameStates)
    socket.emit("replay states", ({gameStates: serializedGameStates}))
  })

  socket.on("send message", ({messageText}) => {
    let receivingRoom
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        receivingRoom = room
      }
    })
    const currentTime = new Date()
    const timestamp = `${currentTime.getHours().toString().padStart(2, '0')}:` +
      `${currentTime.getMinutes().toString().padStart(2, '0')}`
    io.to(receivingRoom).emit("add message", ({message: {user: socket.request.user.username, timestamp, text: messageText}}))
  })

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected")
  })
})

httpServer.listen(configuration.web.port, configuration.web.host, () => {
  console.log("Server is listening...")
})

export default app
