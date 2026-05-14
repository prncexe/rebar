import type { nextjschoice } from "@/prompts/nextjs";
import { changeDir } from "@/scripts/common";
import type { pkgmanager } from "@/types/common";
import { execSync } from "child_process";

const scaffoldCommandMap: Record<pkgmanager, string> = {
  npm: "npx create-next-app@latest",
  pnpm: "pnpm create next-app",
  yarn: "yarn create next-app",
  bun: "bunx create-next-app",
};

// const installCommandMap: Record<pkgmanager, string> = {
//   npm: "npm install",
//   pnpm: "pnpm install",
//   yarn: "yarn install",
//   bun: "bun install",
// };

export const buildFlags = (answer: nextjschoice[]) => {
  const flagsArray = ["--tailwind", "--src-dir", "--app"];
  if (answer.includes("typescript")) {
    flagsArray.push("--ts");
  }

  if (answer.includes("pathAliasing")) {
    flagsArray.push(`--import-alias "@/*"`);
  }

  return flagsArray;
};

export const installNextApp = (manager: pkgmanager, flagsArray: string[], name: string) => {
  const flagString = flagsArray.join(" ");
  const scaffoldCommand = `${scaffoldCommandMap[manager]} ${name} ${flagString} --skip-install`;

  execSync(scaffoldCommand, {
    stdio: "inherit",
  });
  changeDir(name);


};
