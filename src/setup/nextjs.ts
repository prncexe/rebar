import type { pkgmanager } from "@/types/common"
import { typeProjectName } from "@/prompts/basic"
import { linter, nextjsChoices } from "@/prompts/nextjs"
import { authSetup, buildFlags, drizzleSetup, huskySetup, installNextApp, shadcnInstall, trpcSetup } from "@/scripts/nextjs"
import { step, success, done as doneMsg } from "@/utils/display"
export const buildNextApp = async (manager: pkgmanager) => {
  step(1, "Project name");
  const name = await typeProjectName()

  step(2, "Extra tools");
  const choices = await nextjsChoices()

  step(3, "Linter");
  const linterChoice = await linter();

  const trpc = choices.includes("trpc")
  const shadcn = choices.includes("shadcn")
  const drizzle = choices.includes("Drizzle")
  const husky = choices.includes("husky")
  const auth = choices.includes("betterAuth")

  step(4, "Scaffolding Next.js project");
  const flags = buildFlags(choices, linterChoice)
  installNextApp(manager, flags, name);
  success("Next.js project created");

  if (shadcn) {
    step(5, "Installing shadcn/ui");
    shadcnInstall(manager, shadcn);
    success("shadcn/ui installed");
  }
  if (trpc) {
    step(6, "Setting up tRPC");
    trpcSetup(manager, trpc);
    success("tRPC configured");
  }
  if (drizzle) {
    step(7, "Setting up Drizzle ORM");
    drizzleSetup(manager, drizzle);
    success("Drizzle ORM configured");
  }
  if (husky) {
    step(8, "Setting up Husky");
    huskySetup(manager, husky);
    success("Husky configured");
  }
  if (auth) {
    step(9, "Setting up Better Auth");
    authSetup(manager, auth);
    success("Better Auth configured");
  }
  doneMsg();
}
