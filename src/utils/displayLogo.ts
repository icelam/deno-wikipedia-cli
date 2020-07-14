import { cyan, yellow } from '../deps.ts';

const separator = '-------------------------------------------------------------------------------------';
const asciiTitle = `
  ██     ██ ██ ██   ██ ██ ██████  ███████ ██████  ██  █████       ██████ ██      ██
  ██     ██ ██ ██  ██  ██ ██   ██ ██      ██   ██ ██ ██   ██     ██      ██      ██
  ██  █  ██ ██ █████   ██ ██████  █████   ██   ██ ██ ███████     ██      ██      ██
  ██ ███ ██ ██ ██  ██  ██ ██      ██      ██   ██ ██ ██   ██     ██      ██      ██
   ███ ███  ██ ██   ██ ██ ██      ███████ ██████  ██ ██   ██      ██████ ███████ ██
`;

/**
 * Display the application logo (ASCII).
 */
const displayLogo = (): void => {
  console.log(yellow(`\n${separator}`));
  console.log(cyan(asciiTitle));
  console.log(yellow(`${separator}\n`));
};

export default displayLogo;
