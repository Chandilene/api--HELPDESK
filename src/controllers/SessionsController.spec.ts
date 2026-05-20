import request from "supertest";
import { app } from "@/app";
import { hash } from "bcryptjs";

jest.mock("@/database/prisma", () => ({
  __esModule: true,

  prisma: require("../database/__mocks__/prisma").prismaMock,
}));

import { prismaMock } from "../database/__mocks__/prisma";

describe("Controller: SessionsController (Login com Mock)", () => {
  it("deverá autenticar com email e senha válidos", async () => {
    const passwordHash = await hash("123456", 8);

    prismaMock.user.findUnique.mockResolvedValue({
      id: "user-id-123",
      name: "Usuario de teste",
      email: "usuariotest@gmail.com",
      password: passwordHash,
      role: "CUSTOMER",
      avatar: null,
      schedule: [],
      createdAt: new Date(),
    });

    const response = await request(app)
      .post("/sessions")
      .send({ email: "usuariotest@gmail.com", password: "123456" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("deverá retornar erro se o usuário não existir", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const response = await request(app)
      .post("/sessions")
      .send({ email: "inexistente@gmail.com", password: "123456" });

    expect(response.status).toBe(400);
  });
});
