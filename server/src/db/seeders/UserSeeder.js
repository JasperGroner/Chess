import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "themainplayer@gmail.com",
        username: "TheCreator",
        password: "password"
      },
      {
        email: "agoodfriend@gmail.com",
        username: "BuddyPal",
        password: "password"
      }
    ]

    for (const userSeed of userData) {
      const seeded = await User.query().findOne({email: userSeed.email})

      if (!seeded) {
        await User.query().insert(userSeed)
      }
    }
  }
}

export default UserSeeder