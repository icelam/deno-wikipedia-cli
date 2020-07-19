import { Rhum } from '../../deps.ts';

const separator = '-------------------------------------------------------------------------------------';
const asciiTitle = `
  ██     ██ ██ ██   ██ ██ ██████  ███████ ██████  ██  █████       ██████ ██      ██
  ██     ██ ██ ██  ██  ██ ██   ██ ██      ██   ██ ██ ██   ██     ██      ██      ██
  ██  █  ██ ██ █████   ██ ██████  █████   ██   ██ ██ ███████     ██      ██      ██
  ██ ███ ██ ██ ██  ██  ██ ██      ██      ██   ██ ██ ██   ██     ██      ██      ██
   ███ ███  ██ ██   ██ ██ ██      ███████ ██████  ██ ██   ██      ██████ ███████ ██
`;

const expected = `
\x1b[33m${separator}\x1b[39m
\x1b[36m${asciiTitle}\x1b[39m
\x1b[33m${separator}\x1b[39m
`;

Rhum.testPlan('displayLogo.ts', () => {
  Rhum.testSuite('displayLogo()', () => {
    Rhum.testCase('should display app logo', async () => {
      const p = await Deno.run({
        cmd: [
          'deno',
          'eval',
          '--quiet',
          'import displayLogo from \'./src/utils/displayLogo.ts\'; displayLogo();'
        ],
        stdout: 'piped',
        stderr: 'piped'
      });
      const status = await p.status();

      const stdout = new TextDecoder().decode(await p.output());
      const stderr = new TextDecoder().decode(await p.stderrOutput());
      p.close();

      Rhum.asserts.assertEquals(stderr, '');
      Rhum.asserts.assertEquals(stdout, `${expected}\n`);
      Rhum.asserts.assertEquals(status.code, 0);
      Rhum.asserts.assertEquals(status.success, true);
    });
  });
});

Rhum.run();
