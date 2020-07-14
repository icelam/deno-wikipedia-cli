import {
  IMakeRequestSuccessResponse, IMakeRequestFailureResponse, IMakeRequestOptions
} from '../types.ts';

/**
 * Wrapper of fetch function. Logic is applied to standardize error handling mechanism.
 */
export const makeRequest = async (
  method: string,
  url: string,
  responseType = 'json',
  options?: IMakeRequestOptions
): Promise<
  IMakeRequestSuccessResponse | IMakeRequestFailureResponse
> => {
  try {
    const response: Response = await fetch(url, {
      method,
      headers: options?.headers,
      body: options?.body
    });

    const responseHeaders: Headers = response.headers;
    const payload = responseType === 'json'
      ? await response.json()
      : responseType === 'blob'
        ? await response.blob()
        : await response.text();

    return {
      status: 'SUCCESS',
      responseHeaders,
      payload
    };
  } catch (error) {
    return {
      status: 'FAILED',
      errorCode: 'CATCHED_MAKE_REQUEST_ERROR',
      detail: error.message
    };
  }
};

/**
 * Detects if the reponse payload is a success one or not.
 * Type guards applied here.
 */
export const isRequestSuccess = (
  object: IMakeRequestSuccessResponse | IMakeRequestFailureResponse
): object is IMakeRequestSuccessResponse => object && !Object.prototype.hasOwnProperty.call(object, 'errorCode');
