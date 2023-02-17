import addPassportIO from "./addPassportIO.js"
import addIOSession from "./addIOSession.js";

const addMiddlewaresIO = async io => {
  addIOSession(io)
  addPassportIO(io)
}

export default addMiddlewaresIO;