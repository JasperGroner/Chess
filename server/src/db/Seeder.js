/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import GameSeeder from "./seeders/GameSeeder.js"

class Seeder {
  static async seed() {

    await UserSeeder.seed()
    await GameSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder