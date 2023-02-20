import Serializer from "./Serializer.js";

class UserSerializer extends Serializer {
  static getDetail(user) {
    return this.serialize(user, ["username"])
  }
}

export default UserSerializer