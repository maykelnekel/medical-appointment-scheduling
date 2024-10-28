import { SchedulingController } from "./controller";
import middy from "middy";
import { bodyValidator } from "../utils/validators/bodyValidator";
import { errorHandler } from "../utils/Errors/errorHandler";
import { createSchedulingSchema } from "./schemas/scheduling";

const controller = new SchedulingController();

export const createScheduling = middy(controller.createScheduling)
  .use(bodyValidator(createSchedulingSchema))
  .use(errorHandler());
