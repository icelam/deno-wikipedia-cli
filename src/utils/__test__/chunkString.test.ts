import chunkString from '../chunkString.ts';
import { assertEquals } from '../../deps.ts';

const stringSample1 = 'Set the default language used in search, accepts a Wikipedia language code';
const targetLength1 = 38;
const expectedResult1 = [
  'Set the default language used in search, ',
  'accepts a Wikipedia language code'
];

const stringSample2 = 'Temporary set the target language to be used in search, accepts a Wikipedia language code';
const targetLength2 = 38;
const expectedResult2 = [
  'Temporary set the target language to be ',
  'used in search, accepts a Wikipedia language ',
  'code'
];

const stringSample3 = 'Show help and all available options';
const targetLength3 = 38;
const expectedResult3 = ['Show help and all available options'];

const stringSample4 = 'Pre-define the keyword used in search';
const targetLength4 = 37;
const expectedResult4 = ['Pre-define the keyword used in search'];

Deno.test(`Split string of length ${stringSample1.length} in to 2 chunk, which each chunk will have around ${targetLength1} characters`, () => {
  assertEquals(chunkString(stringSample1, targetLength1), expectedResult1);
});

Deno.test(`Split string of length ${stringSample2.length} in to 3 chunk, which each chunk will have around ${targetLength2} characters`, () => {
  assertEquals(chunkString(stringSample2, targetLength2), expectedResult2);
});

Deno.test(`Split string of length ${stringSample3.length} in to 1 chunk since input is shorter then target chunk length ${targetLength3}`, () => {
  assertEquals(chunkString(stringSample3, targetLength3), expectedResult3);
});

Deno.test(`Split string of length ${stringSample4.length} in to 1 chunk as length is equal target chunk length ${targetLength4}`, () => {
  assertEquals(chunkString(stringSample4, targetLength4), expectedResult4);
});
