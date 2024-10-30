/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from "joi";
import { bodyValidator } from "../../../utils/validators/bodyValidator";
import { HttpError } from "../../../utils/Errors/HttpError";
import { HandlerLambda } from "middy";

describe("bodyValidator", () => {
  let handler: HandlerLambda;
  let next: jest.Mock;
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
  });

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

  it("should throw an HttpError if body is missing", () => {
    handler.event.body = null;

    expect(() => bodyValidator(schema).before(handler, next)).toThrow(
      new HttpError(400, "Não existe um corpo válido na requisição"),
    );
  });

  it("should throw a ValidationError if body is invalid", () => {
    handler.event.body = JSON.stringify({ name: "John" }); // Missing age

    expect(() => bodyValidator(schema).before(handler, next)).toThrow(
      Joi.ValidationError,
    );
  });

  it("should call next if body is valid", () => {
    handler.event.body = JSON.stringify({ name: "John", age: 30 });

    bodyValidator(schema).before(handler, next);

    expect(next).toHaveBeenCalled();
  });
});
