import isValidConfigurationFile from '../isValidConfigurationFile.ts';
import { Rhum } from '../../deps.ts';

const testData = [
  { input: null, expected: false },
  { input: { language: 'zh' }, expected: true },
  { input: { language: 'xxx' }, expected: false }
];

Rhum.testPlan('isValidConfigurationFile.ts', () => {
  Rhum.testSuite('isValidConfigurationFile()', () => {
    testData.forEach(({ input, expected }) => {
      Rhum.testCase(`should identify ${JSON.stringify(input)} as ${expected ? '' : 'in'}valid configuration file`, () => {
        Rhum.asserts.assertEquals(isValidConfigurationFile(input), expected);
      });
    });
  });
});

Rhum.run();
