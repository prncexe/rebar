import type { pkgmanager } from "@/types/common";
import { checkbox } from "@inquirer/prompts";

export type ExpressChoice = "typescript" | "git" | "eslint" | "pathAliasing";

export const expressPrompts = async (manager: pkgmanager): Promise<readonly ExpressChoice[]> => {
  return await checkbox<ExpressChoice>({
    message: "select tools to add",
    choices: [
      {
        name: 'typescript?',
        value: 'typescript',
        disabled: manager === 'bun' ? 'Always on by bun' : false,
        checked: manager === 'bun' ? true : false
      },
      {
        name: 'git?',
        value: 'git'
      },
      {
        name: 'Eslint?',
        value: 'eslint'
      },
      {
        name: 'Path Aliasing (@/*)',
        value: 'pathAliasing'
      }
    ]
  })
}
