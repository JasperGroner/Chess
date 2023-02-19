import Serializer from "./Serializer.js";

class UserSerializer extends Serializer {
  static async getDetailByPlayer(user) {
    return this.serializer(user, ["username"])
  }
}

export default UserSerializer