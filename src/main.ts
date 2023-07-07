import { port } from "./envs.js";
import logger from "./logger.js";
import { createServer } from "./server.js";

const { frc } = logger();
createServer(frc).listen(port);
