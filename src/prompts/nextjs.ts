import { checkbox, select } from "@inquirer/prompts";

type optionalChoice = "None";
export type nextjschoice = "typescript" | "shadcn" | "pathAliasing"|  "Drizzle" | "trpc" | "husky" 

type linter = "eslint" | "biome" | optionalChoice

type Auth = "authJs" | "betterAuth" | optionalChoice;


const authChoices: Record<Auth, string> = {
  authJs: "Auth.js",
  betterAuth: "Better Auth",
  None : "none",
};

const linterChoices: Record<linter, string> = {
  eslint: "eslint",
  biome: "biome",
  None: "none"
}
const nextChoices: Record<nextjschoice, string> = {
  typescript: "typescript",
  husky : "husky",
  pathAliasing: "pathAliasing",
  shadcn: "shadcn",
  trpc: "trpc",
  Drizzle:  "drizzle"
}


export const nextjsChoices = async (): Promise<nextjschoice[]> => {
  const answers: readonly nextjschoice[] = await checkbox<nextjschoice>({
    message: "Choose tools to include",
    choices: Object.entries(nextChoices).map(
      ([value, name]) => ({
         name,
         value: value as nextjschoice
        })
    )
  });

  const selected = new Set(answers);

  if (selected.has("shadcn")) {
    selected.add("typescript");
    selected.add("pathAliasing");
  }

  if (selected.has("trpc")) {
    selected.add("typescript");
    selected.add("pathAliasing");
  }

  return Array.from(selected);
};

export const linter = async ():Promise<linter> => {
 return  await select<linter>({
    message: 'select a linter',
   choices: Object.entries(linterChoices).map(
     ([value, name]) => ({
       name,
       value: value as linter
      })
    )
 })
}

export const auth = async (): Promise<Auth> => {
  return await select<Auth>({
    message: "Choose auth service",
    choices: Object.entries(authChoices).map(
      ([value, name]) => ({
        name,
        value: value as Auth
      })
    )
  });
};

