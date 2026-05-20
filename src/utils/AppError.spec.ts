import { AppError } from "./AppError";

describe("Classe AppError", () => {
  it("deve criar um erro com mensagem e status corretos do erro", () => {
    const erro = new AppError("Email já cadastrado!", 409);

    expect(erro.message).toBe("Email já cadastrado!");
    expect(erro.statusCode).toBe(409);
  });

  it("deverá criar um erro com status code 400 quando não for passado nenhum", () => {
    const erro = new AppError("Erro sem status code");

    expect(erro.message).toBe("Erro sem status code");
    expect(erro.statusCode).toBe(400);
  });
});
