/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from "joi";
import { errorHandler } from "../../../utils/Errors/errorHandler";
import { HttpError } from "../../../utils/Errors/HttpError";
import { HandlerLambda } from "middy";

describe("errorHandler", () => {
  let handler: HandlerLambda;
  let next: jest.Mock;

  beforeEach(() => {
    handler = {
      event: {},
      context: {
        callbackWaitsForEmptyEventLoop: false,
        functionName: "",
        functionVersion: "",
        invokedFunctionArn: "",
        memoryLimitInMB: "",
        awsRequestId: "",
        logGroupName: "",
        logStreamName: "",
        getRemainingTimeInMillis: function (): number {
          throw new Error("Function not implemented.");
        },
        done: function (_?: Error, __?: any): void {
          throw new Error("Function not implemented.");
        },
        fail: function (_: Error | string): void {
          throw new Error("Function not implemented.");
        },
        succeed: function (_: any): void {
          throw new Error("Function not implemented.");
        },
      },
      callback: jest.fn(),
      error: new Error(),
      response: null,
    };
    next = jest.fn();
  });

  it("should handle ValidationError with a 400 status code", () => {
    const validationError = new ValidationError("Validation error", [], null);
    handler.error = validationError;

    errorHandler().onError(handler, next);

    expect(handler.response).toEqual({
      statusCode: 400,
      body: JSON.stringify({
        message: "Corpo da requisição inválido",
        details: validationError.details,
      }),
    });
    expect(next).toHaveBeenCalled();
  });

  it("should handle HttpError with the correct status code and message", () => {
    const httpError = new HttpError(404, "Not Found");
    handler.error = httpError;

    errorHandler().onError(handler, next);

    expect(handler.response).toEqual({
      statusCode: 404,
      body: JSON.stringify({ message: "Not Found" }),
    });
    expect(next).toHaveBeenCalled();
  });

  it("should handle unexpected errors with a 500 status code", () => {
    const unexpectedError = new Error("Unexpected error");
    handler.error = unexpectedError;

    errorHandler().onError(handler, next);

    expect(handler.response).toEqual({
      statusCode: 500,
      body: JSON.stringify({ error: "Ocorreu um erro inesperado" }),
    });
    expect(next).toHaveBeenCalled();
  });
});
