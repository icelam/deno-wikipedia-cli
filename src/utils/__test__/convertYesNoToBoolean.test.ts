import convertYesNoToBoolean from '../convertYesNoToBoolean.ts';
import { assertEquals } from '../../deps.ts';

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

testData.forEach(({ input, expected }) => {
  Deno.test(`convert '${input}' to ${expected}`, () => {
    assertEquals(convertYesNoToBoolean(input), expected);
  });
});
