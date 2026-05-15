import { checkbox, select } from "@inquirer/prompts";
import { colors } from "@/utils/display";

type optionalChoice = "None";
export type nextjschoice = "reactCompiler" | "shadcn" | "betterAuth" | "Drizzle" | "trpc" | "husky"

export type linter = "eslint" | "biome" | optionalChoice

export type Auth = "authJs" | "betterAuth" | optionalChoice;

const nextChoices: Record<nextjschoice, { name: string; description: string }> = {
  husky: { name: "Husky", description: "Git hooks made easy" },
  shadcn: { name: "shadcn/ui", description: "Beautifully designed React components" },
  trpc: { name: "tRPC", description: "End-to-end typesafe APIs" },
  Drizzle: { name: "Drizzle ORM", description: "TypeScript ORM for SQL" },
  reactCompiler: { name: "React Compiler", description: "Optimize React rendering" },
  betterAuth: { name: "Better Auth", description: "Authentication framework (auto-includes Drizzle)" },
};

export const nextjsChoices = async (): Promise<nextjschoice[]> => {
  const answers: readonly nextjschoice[] = await checkbox<nextjschoice>({
    message: `${colors.cyan('\u276F')} Extra tools to include`,
    choices: Object.entries(nextChoices).map(
      ([value, meta]) => ({
        name: meta.name,
        value: value as nextjschoice,
        description: meta.description,
      })
    ),
  });

  const selected = new Set(answers);

  if (selected.has("betterAuth")) {
    selected.add("Drizzle");
  }
  return Array.from(selected);
};

export const linter = async (): Promise<linter> => {
  return await select<linter>({
    message: `${colors.cyan('\u276F')} Pick a linter`,
    choices: [
      { name: "ESLint", value: "eslint", description: "Standard linter with rich ecosystem" },
      { name: "Biome", value: "biome", description: "Fast, modern linter & formatter" },
      { name: "None", value: "None", description: "Skip linter setup" },
    ],
  });
};


