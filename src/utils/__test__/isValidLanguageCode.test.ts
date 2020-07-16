import isValidLanguageCode from '../isValidLanguageCode.ts';
import { Rhum } from '../../deps.ts';

const testData = [
  { input: 'zh', expected: true },
  { input: 'en', expected: true },
  { input: '123', expected: false },
  { input: 'unknown', expected: false }
];

Rhum.testPlan('isValidLanguageCode.ts', () => {
  Rhum.testSuite('isValidLanguageCode()', () => {
    testData.forEach(({ input, expected }) => {
      Rhum.testCase(`should identify '${input}' as ${expected ? '' : 'in'}valid language code`, () => {
        Rhum.asserts.assertEquals(isValidLanguageCode(input), expected);
      });
    });
  });
});

Rhum.run();
