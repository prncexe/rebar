const isColorSupported =
  process.stdout.isTTY && !process.env.NO_COLOR;

const style = (open: number, close = 39) => {
  const c = open === 1 ? 22 : open === 2 ? 22 : close;
  return (s: string) =>
    isColorSupported ? `\x1b[${open}m${s}\x1b[${c}m` : s;
};

export const colors = {
  cyan: style(36),
  green: style(32),
  red: style(31),
  yellow: style(33),
  blue: style(34),
  magenta: style(35),
  gray: style(90),
  bold: style(1),
  dim: style(2),
};

const SYM = {
  check: '\u2713',
  cross: '\u2717',
  arrow: '\u276F',
  bullet: '\u25CF',
};

export function banner() {
  console.log(`
  ${colors.cyan(colors.bold('\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557'))}
  ${colors.cyan('\u2551')}          ${colors.magenta(colors.bold('R E B A R'))}           ${colors.cyan('\u2551')}
  ${colors.cyan('\u2551')}    ${colors.gray('project scaffold CLI')}      ${colors.cyan('\u2551')}
  ${colors.cyan(colors.bold('\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2559'))}
  `);
}

export function step(num: number, msg: string) {
  console.log(`\n  ${colors.cyan(colors.bold(`${SYM.arrow} Step ${num}`))}${colors.gray(':')} ${colors.bold(msg)}`);
  console.log(colors.gray(`  ${'\u2500'.repeat(50)}`));
}

export function success(msg: string) {
  console.log(`  ${colors.green(`${SYM.check} ${msg}`)}`);
}

export function error(msg: string) {
  console.log(`  ${colors.red(`${SYM.cross} ${msg}`)}`);
}

export function info(msg: string) {
  console.log(`  ${colors.blue('\u2139')} ${msg}`);
}

export function warning(msg: string) {
  console.log(`  ${colors.yellow(`${SYM.bullet} ${msg}`)}`);
}

export function done() {
  console.log(`
  ${colors.green(colors.bold(`${SYM.check} All done!`))}
  ${colors.gray('Happy coding!')}
  `);
}
