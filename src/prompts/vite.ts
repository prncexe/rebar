import { checkbox } from "@inquirer/prompts";

export type ViteChoice = "typescript" | "pathAlising" | "reactCompiler" | "tailwind" | "shadcn" | "reactRouter";

export const viteChoices = async (): Promise<ViteChoice[]> => {
  const answers: readonly ViteChoice[] = await checkbox<ViteChoice>({
    message: 'Choose tools to include',
    choices: [
      {
        name: 'Typescript',
        value: 'typescript'
      },
      {
        name: "Path Aliasing (@/ imports)",
        value: "pathAlising",
        description: "Recommended for shadcn, Required for typescript"
      },
      {
        name: "React Compiler (Recommended)",
        value: "reactCompiler"
      },
      {
        name: 'Tailwind',
        value: 'tailwind'
      },
      {
        name: 'Shadcn',
        value: 'shadcn'
      },
      {
        name: 'React Router',
        value: 'reactRouter'
      }
    ]
  })

  const selected = new Set(answers)

  if (selected.has('shadcn')) {
    selected.add('typescript')
    selected.add('tailwind')
  }

  return Array.from(selected)
}
