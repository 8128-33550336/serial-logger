import { port } from "./envs";
import logger from "./logger";
import { app } from "./server";

logger();
app.listen(port);
