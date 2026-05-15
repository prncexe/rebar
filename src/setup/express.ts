import { typeProjectName } from "@/prompts/basic";
import { expressPrompts } from "@/prompts/express";
import { createRepoAndCd, initializeGit } from "@/scripts/common";
import type { pkgmanager } from "@/types/common";
import { addEslint, expressServer, expressPathAliasing } from "@/scripts/express";
import { step, success, done as doneMsg } from "@/utils/display";

export const buildExpressApp = async (manager: pkgmanager) => {
  step(1, "Project name");
  const name = await typeProjectName()

  step(2, "Extra tools");
  const answers = await expressPrompts(manager)
  const ts = answers.includes("typescript")
  const git = answers.includes("git")
  const eslint = answers.includes("eslint")
  const pathAliasing = answers.includes("pathAliasing")

  step(3, "Creating project directory");
  createRepoAndCd(name)

  step(4, "Setting up Express server");
  await expressServer({ manager, ts })
  success("Express project created");

  if (git) {
    step(5, "Initializing Git repository");
    initializeGit(git)
    success("Git repository initialized");
  }
  if (eslint) {
    step(6, "Setting up ESLint");
    addEslint({ eslint, ts, manager })
    success("ESLint configured");
  }
  if (pathAliasing) {
    step(7, "Setting up path aliasing");
    expressPathAliasing({ ts, pathAliasing })
    success("Path aliasing configured");
  }
  doneMsg();
}
