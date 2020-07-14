import isValidLanguageCode from '../isValidLanguageCode.ts';
import { assertEquals } from '../../deps.ts';

const testData = [
  { input: 'zh', expected: true },
  { input: 'en', expected: true },
  { input: '123', expected: false },
  { input: 'unknown', expected: false }
];

testData.forEach(({ input, expected }) => {
  Deno.test(`should identify '${input}' as ${expected ? '' : 'in'}valid language code`, () => {
    assertEquals(isValidLanguageCode(input), expected);
  });
});
