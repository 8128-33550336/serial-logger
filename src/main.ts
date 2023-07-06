import { port } from "./envs";
import logger from "./logger";
import { createServer } from "./server";

const { frc } = logger();
createServer(frc).listen(port);
