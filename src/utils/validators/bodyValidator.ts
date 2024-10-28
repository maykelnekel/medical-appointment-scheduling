import { Schema } from "joi";
import { HandlerLambda, NextFunction } from "middy";
import { HttpError } from "../Errors/HttpError";

export const bodyValidator = (schema: Schema) => ({
  before: (handler: HandlerLambda, next: NextFunction) => {
    const { body } = handler.event;
    if (!body) {
      throw new HttpError(400, "Não existe um corpo válido na requisição");
    }

    const data = JSON.parse(body);
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      throw error;
    }

    return next();
  },
});
