import { electronFramework } from "@/prompts/electronFramework";
import type { pkgmanager } from "@/types/common";
import { spawn } from "child_process";
import { step, info } from "@/utils/display";

export const buildElectronApp = async (manager: pkgmanager) => {
  step(1, "Build tool");
  await electronFramework();

  step(2, "Scaffolding Electron app");
  info("Launching interactive Electron quick-start...\n");

  const child = spawn(manager, ['create', '@quick-start/electron'], {
    stdio: "inherit",
    cwd: process.cwd(),
    shell: true,
  });

  child.on("close", (code) => process.exit(code ?? 0));
};
