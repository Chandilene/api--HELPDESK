import { verifyUserAuthorization } from "./verifyUserAuthorization";
import { AppError } from "@/utils/AppError";

describe("Middleware: verifyUserAutorization", () => {
  it("Deverá permitir o acesso se existir um user e um perfil autorizado", () => {
    const mockRequest = {
      user: {
        role: "ADMIN",
      },
    } as any;

    const mockResponse = {} as any;

    const nextFunction = jest.fn();

    const middleware = verifyUserAuthorization(["ADMIN"]);
    middleware(mockRequest, mockResponse, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
  });

  test("deve barrar o acesso e lançar um AppError se o perfil não estiver autorizado", () => {
    const mockRequest = {
      user: {
        role: "COSTUMER",
      },
    } as any;

    const mockResponse = {} as any;
    const nextFunction = jest.fn();

    const middleware = verifyUserAuthorization(["ADMIN"]);

    expect(() => {
      middleware(mockRequest, mockResponse, nextFunction);
    }).toThrow(AppError);

    expect(nextFunction).not.toHaveBeenCalled();
  });
});
