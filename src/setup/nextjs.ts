import { spawn } from "child_process"
import type { pkgmanager } from "@/types/common"
import { typeProjectName } from "@/prompts/basic"
import { auth, nextjsChoices } from "@/prompts/nextjs"
import { buildFlags, installNextApp } from "@/scripts/nextjs"
export const buildNextApp = async(manager: pkgmanager) => {
  const name = await typeProjectName()
  const choices = await nextjsChoices()
  const authProvider = await auth();

  const typescript = choices.includes("typescript")
  const trpc = choices.includes("trpc")
  const shadcn = choices.includes("shadcn")
  const drizzle = choices.includes("Drizzle")
  const pathAliasing = choices.includes("pathAliasing")
  const husky = choices.includes("husky")


  const flags = buildFlags(choices)
  installNextApp(manager, flags, name);
  
 

}
