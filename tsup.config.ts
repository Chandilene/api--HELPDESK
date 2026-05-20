import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "build",
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ["cjs"],

  external: ["@/generated/prisma/client", "@prisma/client"],
});
