import type { pkgmanager } from "@/types/common";
import { checkbox } from "@inquirer/prompts";
import { colors } from "@/utils/display";

export type ExpressChoice = "typescript" | "git" | "eslint" | "pathAliasing";

export const expressPrompts = async (manager: pkgmanager): Promise<readonly ExpressChoice[]> => {
  return await checkbox<ExpressChoice>({
    message: `${colors.cyan('\u276F')} Extra tools to include`,
    choices: [
      {
        name: 'TypeScript',
        value: 'typescript',
        description: 'Static type checking for safer code',
        disabled: manager === 'bun' ? 'Always enabled with bun' : false,
        checked: manager === 'bun' ? true : false,
      },
      {
        name: 'Git',
        value: 'git',
        description: 'Initialize a git repository',
      },
      {
        name: 'ESLint',
        value: 'eslint',
        description: 'Code quality & consistency',
      },
      {
        name: 'Path Aliasing (@/*)',
        value: 'pathAliasing',
        description: 'Clean imports with @/ prefix',
      },
    ],
  });
};
