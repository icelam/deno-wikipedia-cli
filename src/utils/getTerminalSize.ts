import { ITerminalSize } from '../types.ts';

/**
 * Returns the current terminal width (columns) and height (rows).
 */
// FIXME: This is an unstable feature for getting terminal size
const getTerminalSize = async (): Promise<
  ITerminalSize
> => (await Deno.consoleSize(Deno.stdout.rid));

export default getTerminalSize;
