import { port } from "./envs";
import logger from "./logger";
import { app } from "./server";

const { frc } = logger();
app.listen(port);
