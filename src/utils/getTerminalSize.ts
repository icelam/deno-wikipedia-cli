import { ITerminalSize } from '../types.ts';

/**
 * Returns the current terminal width (columns) and height (rows).
 */
const getTerminalSize = async (): Promise<ITerminalSize> => {
  // FIXME: This is an unstable feature for getting terminal size
  const {
    columns: terminalWidth,
    rows: terminalHeight
  } = await Deno.consoleSize(Deno.stdout.rid);

  return { terminalWidth, terminalHeight };
};

export default getTerminalSize;
