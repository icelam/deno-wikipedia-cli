/**
 * Split string to specified length at closest space.
 */
const chunkString = (text: string, length: number): RegExpMatchArray | null => {
  const re = new RegExp(`.{${length}}\\w*\\W*|.+`, 'g');
  return text.match(re);
};

export default chunkString;
