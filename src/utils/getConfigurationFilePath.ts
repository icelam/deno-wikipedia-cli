/**
 * Get configuration file path.
 */
const getConfigurationFilePath = (): string => {
  const homePath: string = Deno.env.get('HOME') ?? '.';
  return `${homePath}/.wiki-cli.json`;
};

export default getConfigurationFilePath;
