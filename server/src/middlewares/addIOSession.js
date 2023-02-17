import session from "cookie-session";
import configuration from "../config.js";

const addIOSession = (io) => {
  io.engine.use(
    session({
      name: "chess-session",
      keys: [configuration.session.secret],
      resave: true,
      maxAge: configuration.maxAge,
    })
  );
};

export default addIOSession;
