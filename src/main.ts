import { port } from "./envs.js";
import logger from "./logger.js";
import { app } from "./server.js";

logger();
app.listen(port);