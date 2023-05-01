import { Request } from "express";
import GroupValidation from "../../group/GroupValidation";
import ValidationError from "../../others/error/ValidationError";

describe("validateAddNewGroupRequestBody", () => {
  let groupValidation: GroupValidation;
  const number: number = 1;
  beforeAll(() => {
    groupValidation = new GroupValidation();
  });

  test("Invalid input", async () => {
    const validate = async () => {
      const mockRequest = { body: { invalid: "invalid" } } as Request;
      await groupValidation.validateAddNewGroupRequestBody(mockRequest);
    };
    expect(validate).rejects.toThrowError(ValidationError);
  });

  test("Null name", async () => {
    const validate = async () => {
      const mockRequest = { body: { name: null } } as Request;
      await groupValidation.validateAddNewGroupRequestBody(mockRequest);
    };
    expect(validate).rejects.toThrowError(ValidationError);
  });

  test("Invalid name (number)", async () => {
    const validate = async () => {
      const mockRequest = { body: { name: number } } as Request;
      await groupValidation.validateAddNewGroupRequestBody(mockRequest);
    };
    expect(validate).rejects.toThrowError(ValidationError);
  });

  test("Invalid description (number)", async () => {
    const validate = async () => {
      const mockRequest = { body: { name: "name", description: number } } as Request;
      await groupValidation.validateAddNewGroupRequestBody(mockRequest);
    };
    expect(validate).rejects.toThrowError(ValidationError);
  });
});
