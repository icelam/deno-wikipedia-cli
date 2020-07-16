import { Rhum } from '../../deps.ts';

const testData = {
  error: [
    {
      description: 'show',
      input: 'import message from \'./src/utils/message.ts\'; message.error("Error message here");',
      expected: '\x1b[41m\x1b[37m\x1b[1m ERROR \x1b[22m\x1b[39m\x1b[49m \x1b[31mError message here\x1b[39m\n'
    },
    {
      description: 'move line break before',
      input: 'import message from \'./src/utils/message.ts\'; message.error("\\nError message here");',
      expected: '\n\x1b[41m\x1b[37m\x1b[1m ERROR \x1b[22m\x1b[39m\x1b[49m \x1b[31mError message here\x1b[39m\n'
    }
  ],
  warn: [
    {
      description: 'show',
      input: 'import message from \'./src/utils/message.ts\'; message.warn("Warning message here");',
      expected: '\x1b[43m\x1b[37m\x1b[1m WARN \x1b[22m\x1b[39m\x1b[49m \x1b[33mWarning message here\x1b[39m\n'
    },
    {
      description: 'move line break before',
      input: 'import message from \'./src/utils/message.ts\'; message.warn("\\nWarning message here");',
      expected: '\n\x1b[43m\x1b[37m\x1b[1m WARN \x1b[22m\x1b[39m\x1b[49m \x1b[33mWarning message here\x1b[39m\n'
    }
  ],
  success: [
    {
      description: 'show',
      input: 'import message from \'./src/utils/message.ts\'; message.success("Success message here");',
      expected: '\x1b[42m\x1b[37m\x1b[1m SUCCESS \x1b[22m\x1b[39m\x1b[49m \x1b[32mSuccess message here\x1b[39m\n'
    },
    {
      description: 'move line break before',
      input: 'import message from \'./src/utils/message.ts\'; message.success("\\nSuccess message here");',
      expected: '\n\x1b[42m\x1b[37m\x1b[1m SUCCESS \x1b[22m\x1b[39m\x1b[49m \x1b[32mSuccess message here\x1b[39m\n'
    }
  ],
  info: [
    {
      description: 'show',
      input: 'import message from \'./src/utils/message.ts\'; message.info("Info message here");',
      expected: '\x1b[44m\x1b[37m\x1b[1m INFO \x1b[22m\x1b[39m\x1b[49m Info message here\n'
    },
    {
      description: 'move line break before',
      input: 'import message from \'./src/utils/message.ts\'; message.info("\\nInfo message here");',
      expected: '\n\x1b[44m\x1b[37m\x1b[1m INFO \x1b[22m\x1b[39m\x1b[49m Info message here\n'
    }
  ]
};

const testSuite: ('error' | 'warn' | 'success' | 'info')[] = ['error', 'warn', 'success', 'info'];

Rhum.testPlan('message.ts', () => {
  testSuite.forEach((mode) => {
    Rhum.testSuite(`message.${mode}()`, () => {
      testData[mode].forEach(({ description, input, expected }) => {
        Rhum.testCase(`should ${description} ${mode} message`, async () => {
          const p = await Deno.run({
            cmd: [
              'deno',
              'eval',
              '--quiet',
              input
            ],
            stdout: 'piped',
            stderr: 'piped'
          });
          const status = await p.status();

          const stdout = new TextDecoder().decode(await p.output());
          const stderr = new TextDecoder().decode(await p.stderrOutput());
          p.close();

          Rhum.asserts.assertEquals(stderr, '');
          Rhum.asserts.assertEquals(stdout, expected);
          Rhum.asserts.assertEquals(status.code, 0);
          Rhum.asserts.assertEquals(status.success, true);
        });
      });
    });
  });
});

Rhum.run();
