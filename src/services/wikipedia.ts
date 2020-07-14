import { encodeUrl } from '../deps.ts';
import { makeRequest } from '../utils/index.ts';
import { IMakeRequestSuccessResponse, IMakeRequestFailureResponse } from '../types.ts';
import { DEFAULT_WIKIPEDIA_LANGUAGE } from '../constants.ts';

export const getPage = async (query: string, language?: string): Promise<
  IMakeRequestSuccessResponse | IMakeRequestFailureResponse
> => {
  const targetLanguage: string = language || DEFAULT_WIKIPEDIA_LANGUAGE;
  const encodedQuery: string = encodeUrl(query.replace(' ', '_'));
  const url = `https://${targetLanguage}.wikipedia.org/api/rest_v1/page/summary/${encodedQuery}`;
  const response = await makeRequest('GET', url, 'json');

  return response;
};

export const getRandomPage = async (language?: string): Promise<
  IMakeRequestSuccessResponse | IMakeRequestFailureResponse
> => {
  const targetLanguage: string = language || DEFAULT_WIKIPEDIA_LANGUAGE;
  const url = `https://${targetLanguage}.wikipedia.org/api/rest_v1/page/random/summary`;
  const response = await makeRequest('GET', url, 'json');

  return response;
};

const WikipediaService = {
  getPage,
  getRandomPage
};

export default WikipediaService;
