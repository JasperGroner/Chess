import { connection } from "../boot.js"

class Seeder {
  static async seed() {
    console.log("seeding...")
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder