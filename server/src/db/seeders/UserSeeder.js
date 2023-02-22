import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const userOne = new User()
    userOne.password = "s3cret!p4ssw0rd"

    const userTwo = new User()
    userTwo.password = "buddy?p4ssw0rd"

    const userData = [
      {
        email: "jasper.groner@gmail.com",
        username: "TheCreator",
        password: "s3cret!p4ssw0rd"
      },
      {
        email: "agoodfriend@gmail.com",
        username: "BuddyPal",
        password: "s3cret!p4ssw0rd"
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