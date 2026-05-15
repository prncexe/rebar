import { select } from "@inquirer/prompts";
import { colors } from "@/utils/display";
export const electronFramework = async (): Promise<'electron forge' | 'electron vite'> => {
  return await select({
    message: `${colors.cyan('\u276F')} Pick a build tool for Electron`,
    choices: [
      {
        name: 'Electron Forge',
        value: 'electron forge',
        description: 'Official all-in-one toolchain for Electron',
      },
      {
        name: 'Electron Vite',
        value: 'electron vite',
        description: 'Fast HMR with Vite for Electron',
      },
    ],
  });
};