/**
 * Get configuration file path.
 */
const getConfigurationFilePath = (): string => {
  const homeEnviroment: string | undefined = Deno.env.get('HOME');
  const homePath = homeEnviroment ?? '.';
  return `${homePath}/.wiki-cli.json`;
};

export default getConfigurationFilePath;
