import { SchedulesController } from "./controller";
import { errorHandler } from "../utils/Errors/errorHandler";
import middy from "middy";

const controller = new SchedulesController();

export const getAllSchedules = middy(controller.getSchedules).use(
  errorHandler(),
);
