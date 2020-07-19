import getTerminalSize from '../getTerminalSize.ts';
import { Rhum } from '../../deps.ts';

// FIXME: Find a proper way to run it on Github action:
// https://github.com/actions/runner/issues/241
if (Deno.isatty(Deno.stdout.rid)) {
  Rhum.testPlan('getTerminalSize.ts', () => {
    Rhum.testSuite('getTerminalSize()', () => {
      Rhum.testCase('should return an object which contains terminal rows and columns', async () => {
        const expected = await Deno.consoleSize(Deno.stdout.rid);
        const terminalSize = await getTerminalSize();

        Rhum.asserts.assertEquals(typeof terminalSize === 'object', true);
        Rhum.asserts.assertEquals(Number.isInteger(terminalSize.columns), true);
        Rhum.asserts.assertEquals(terminalSize.columns, expected.columns);
        Rhum.asserts.assertEquals(Number.isInteger(terminalSize.rows), true);
        Rhum.asserts.assertEquals(terminalSize.rows, expected.rows);
      });
    });
  });
} else {
  console.log('Skip running getTerminalSize() test as environment is not a TTY');
}

Rhum.run();
