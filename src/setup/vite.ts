import type { pkgmanager } from "@/types/common"
import { viteChoices } from "@/prompts/vite"
import { typeProjectName } from "@/prompts/basic"
import { initiateVite, patchViteEslintConfigForShadcn, pathAliasingSetup, reactCompilerSetup, reactRouterSetup, rewriteViteConfig, shadcnSetup, tailwindViteSetup, viteConfigCreate } from "@/scripts/vite"
import { step, success, done as doneMsg } from "@/utils/display"
export const buildViteApp = async (manager: pkgmanager) => {
  step(1, "Project name");
  const name = await typeProjectName()

  step(2, "Extra tools");
  const answers = await viteChoices();

  const ts = answers.includes("typescript")
  const tailwind = answers.includes("tailwind")
  const rc = answers.includes("reactCompiler")
  const rr = answers.includes("reactRouter")
  const shadcn = answers.includes("shadcn")
  const pathAliasing = answers.includes("pathAlising")

  step(3, "Scaffolding Vite project");
  initiateVite({ ts, manager, name })
  success("Vite project created");

  const viteConfig = viteConfigCreate({ tailwind, rc, pathAliasing });
  rewriteViteConfig(viteConfig, ts);
  pathAliasingSetup({ pathAliasing, ts })
  patchViteEslintConfigForShadcn(shadcn)

  if (tailwind) {
    step(4, "Setting up Tailwind CSS");
    tailwindViteSetup(manager, tailwind);
    success("Tailwind CSS configured");
  }
  if (rc) {
    step(5, "Setting up React Compiler");
    reactCompilerSetup(manager, rc);
    success("React Compiler configured");
  }
  if (shadcn) {
    step(6, "Installing shadcn/ui");
    shadcnSetup(shadcn, manager);
    success("shadcn/ui installed");
  }
  if (rr) {
    step(7, "Setting up React Router");
    reactRouterSetup({ rr, manager, ts });
    success("React Router configured");
  }
  doneMsg();
}
