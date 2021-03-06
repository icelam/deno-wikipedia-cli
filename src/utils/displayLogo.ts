import { cyan, yellow } from '../deps.ts';

const separator = '-------------------------------------------------------------------------------------';
const asciiTitle = `
  ██     ██ ██ ██   ██ ██ ██████  ███████ ██████  ██  █████       ██████ ██      ██
  ██     ██ ██ ██  ██  ██ ██   ██ ██      ██   ██ ██ ██   ██     ██      ██      ██
  ██  █  ██ ██ █████   ██ ██████  █████   ██   ██ ██ ███████     ██      ██      ██
  ██ ███ ██ ██ ██  ██  ██ ██      ██      ██   ██ ██ ██   ██     ██      ██      ██
   ███ ███  ██ ██   ██ ██ ██      ███████ ██████  ██ ██   ██      ██████ ███████ ██
`;
const fullLogo = `
${yellow(separator)}
${cyan(asciiTitle)}
${yellow(separator)}
`;

/**
 * Display the application logo (ASCII).
 */
const displayLogo = (): void => {
  console.log(fullLogo);
};

export default displayLogo;
