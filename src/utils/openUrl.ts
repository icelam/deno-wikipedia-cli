import { CommandType } from '../types.ts';

/**
 * Open target url in browser.
 */
const openUrl = async (url: string): Promise<void> => {
  const command: CommandType = Deno.build.os === 'darwin'
    ? 'open'
    : Deno.build.os === 'windows'
      ? 'start'
      : 'xdg-open';

  Deno.run({
    cmd: [command, url]
  });
};

export default openUrl;
