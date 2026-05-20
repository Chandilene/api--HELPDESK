import { PrismaClient } from "@prisma/client";
import { beforeEach } from "@jest/globals";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

export const prismaMock =
  mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});
