import { AppError } from "@/utils/AppError";
import { ensureAuthenticated } from "./ensureAuthenticated";

describe("Middleware: ensureAuthenticated:", () => {
  it("deverá retornar um AppError caso não tenha um token na requisição", () => {
    const mockRequest = {
      headers: {},
    } as any;

    const nextFunction = jest.fn();
    const mockResponse = {} as any;

    const middleware = ensureAuthenticated;

    expect(() => {
      middleware(mockRequest, mockResponse, nextFunction);
    }).toThrow(AppError);
  });
});
