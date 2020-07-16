import convertYesNoToBoolean from '../convertYesNoToBoolean.ts';
import { Rhum } from '../../deps.ts';

const testData = [
  { input: 'Yes', expected: true },
  { input: 'YES', expected: true },
  { input: 'yes', expected: true },
  { input: 'y', expected: true },
  { input: 'Y', expected: true },
  { input: 'No', expected: false },
  { input: 'NO', expected: false },
  { input: 'no', expected: false },
  { input: 'n', expected: false },
  { input: 'N', expected: false },
  { input: 'Random', expected: null },
  { input: '1', expected: null }
];

Rhum.testPlan('convertYesNoToBoolean.ts', () => {
  Rhum.testSuite('convertYesNoToBoolean()', () => {
    testData.forEach(({ input, expected }) => {
      Rhum.testCase(`should convert '${input}' to ${expected}`, () => {
        Rhum.asserts.assertEquals(convertYesNoToBoolean(input), expected);
      });
    });
  });
});

Rhum.run();
