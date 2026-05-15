import { checkbox } from "@inquirer/prompts";
import { colors } from "@/utils/display";

export type ViteChoice = "typescript" | "pathAlising" | "reactCompiler" | "tailwind" | "shadcn" | "reactRouter";

export const viteChoices = async (): Promise<ViteChoice[]> => {
  const answers: readonly ViteChoice[] = await checkbox<ViteChoice>({
    message: `${colors.cyan('\u276F')} Extra tools to include`,
    choices: [
      {
        name: 'TypeScript',
        value: 'typescript',
        description: 'Static type checking',
      },
      {
        name: "Path Aliasing (@/ imports)",
        value: "pathAlising",
        description: "Clean imports with @/ prefix (required for shadcn)",
      },
      {
        name: "React Compiler",
        value: "reactCompiler",
        description: "Optimize React rendering automatically",
      },
      {
        name: 'Tailwind CSS',
        value: 'tailwind',
        description: 'Utility-first CSS framework',
      },
      {
        name: 'shadcn/ui',
        value: 'shadcn',
        description: 'Beautiful React components (auto-includes TS + Tailwind)',
      },
      {
        name: 'React Router',
        value: 'reactRouter',
        description: 'Client-side routing for SPAs',
      },
    ],
  });

  const selected = new Set(answers);

  if (selected.has('shadcn')) {
    selected.add('typescript');
    selected.add('tailwind');
  }

  return Array.from(selected);
};
