import { port } from "./envs.js";
import logger from "./logger.js";
import { app } from "./server.js";

const { frc } = logger();
app.listen(port);
