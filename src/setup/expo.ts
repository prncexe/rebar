import type { pkgmanager } from "@/types/common";
import { spawn } from "child_process";
import { step, info } from "@/utils/display";

export const buildExpoApp = (manager: pkgmanager) => {
  step(1, "Scaffolding Expo app");
  info("Launching interactive Expo setup...\n");

  const child = spawn(manager === 'npm' ? 'npx' : manager, ['create', 'expo-app'],
    {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd(),
    });
  child.on("close", (code) => {
    process.exit(code ?? 0);
  });
};
