// TODO: Convert it to import map for easier management

/* Dependencies */
export { parse, Args } from 'https://deno.land/std@0.61.0/flags/mod.ts';
export { readLines } from 'https://deno.land/std@0.61.0/io/bufio.ts';
export * from 'https://deno.land/std@0.61.0/fmt/colors.ts';
export { existsSync } from 'https://deno.land/std@0.61.0/fs/exists.ts';
export { readJsonSync } from 'https://deno.land/std@0.61.0/fs/read_json.ts';
export { writeJsonSync } from 'https://deno.land/std@0.61.0/fs/write_json.ts';
export { encodeUrl } from 'https://deno.land/x/encodeurl@1.0.0/mod.ts';
export { default as AsciiTable } from 'https://deno.land/x/ascii_table@20dd719/mod.ts';

/* Test Dependencies */
export { assertEquals } from 'https://deno.land/std@0.61.0/testing/asserts.ts';
