import { User, Game } from "../../models/index.js"

class GameSeeder {
  static async seed() {
    const userOne = await User.query().findOne({email: "themainplayer@gmail.com"})
    const userTwo = await User.query().findOne({email: "agoodfriend@gmail.com"})

    const gameData = {
      name: "a quick one",
      gameType: "network",
      status: "finished",
      winner: "white",
      players: [
        {
          color: "black",
          userId: userOne.id
        }, 
        {
          color: "white",
          userId: userTwo.id
        }
      ],
      gameStates: [
        {
          encodedState: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
        },
        {
          encodedState: 'rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 1 1'
        }, 
        {
          encodedState: 'rnbqkbnr/1ppppppp/p7/8/8/4P3/PPPP1PPP/RNBQKBNR w KQkq - 2 2'
        },
        {
          encodedState: 'rnbqkbnr/1ppppppp/p7/7Q/8/4P3/PPPP1PPP/RNB1KBNR b KQkq - 3 2'
        },
        {
          encodedState: 'rnbqkbnr/1ppppppp/8/p6Q/8/4P3/PPPP1PPP/RNB1KBNR w KQkq - 4 3'
        },
        {
          encodedState: 'rnbqkbnr/1ppppppp/8/p6Q/2B5/4P3/PPPP1PPP/RNB1K1NR b KQkq - 5 3'
        },
        {
          encodedState: 'rnbqkbnr/1ppppppp/8/7Q/p1B5/4P3/PPPP1PPP/RNB1K1NR w KQkq - 6 4'
        },
        {
          encodedState: 'rnbqkbnr/1ppppQpp/8/8/p1B5/4P3/PPPP1PPP/RNB1K1NR b KQkq - 0 4'
        }
      ]
    }

    const seeded = await Game.query().findOne({name: "a quick one"})

    if (!seeded) {
      await Game.query().insertGraph(gameData)
    }
  }
}

export default GameSeeder