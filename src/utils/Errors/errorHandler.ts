import { HandlerLambda, NextFunction } from "middy";
import { ValidationError } from "joi";
import { HttpError } from "./HttpError";

export const errorHandler = () => ({
  onError: (handler: HandlerLambda, next: NextFunction) => {
    if (handler.error instanceof ValidationError) {
      handler.response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "Corpo da requisição inválido",
          details: handler.error.details,
        }),
      };
    } else if (handler.error instanceof HttpError) {
      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify({ message: handler.error.message }),
      };
    } else {
      handler.response = {
        statusCode: 500,
        body: JSON.stringify({ error: "Ocorreu um erro inesperado" }),
      };
    }
    return next();
  },
});
