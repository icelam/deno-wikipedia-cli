import { makeRequest, isRequestSuccess } from '../makeRequest.ts';
import { IMakeRequestSuccessResponse, IMakeRequestFailureResponse } from '../../types.ts';
import { Rhum } from '../../deps.ts';

const successResponse: IMakeRequestSuccessResponse = {
  status: 'SUCCESS',
  responseHeaders: new Headers({
    'Content-Type': 'application/json'
  }),
  payload: {
    dummyKey: 'Dummy content here.'
  }
};

const failureResponse: IMakeRequestFailureResponse = {
  status: 'FAILED',
  errorCode: 'CATCHED_MAKE_REQUEST_ERROR',
  detail: 'Dummy error message.'
};

Rhum.testPlan('makeRequest.ts', () => {
  Rhum.testSuite('makeRequest()', () => {
    Rhum.testCase('should get a valid url', async () => {
      const response = (await makeRequest(
        'GET',
        'https://en.wikipedia.org/api/rest_v1/page/random/summary',
        'json'
      )) as IMakeRequestSuccessResponse;
      Rhum.asserts.assertEquals(response.status, 'SUCCESS');
      Rhum.asserts.assertEquals(response.responseHeaders instanceof Headers, true);
      Rhum.asserts.assertEquals(typeof response.payload, 'object');
    });

    Rhum.testCase('should get a invalid url', async () => {
      const response = (await makeRequest(
        'GET',
        'http://localhost/',
        'json'
      )) as IMakeRequestFailureResponse;
      Rhum.asserts.assertEquals(response.status, 'FAILED');
      Rhum.asserts.assertEquals(response.errorCode, 'CATCHED_MAKE_REQUEST_ERROR');
      Rhum.asserts.assertEquals(response.detail.length > 0, true);
    });
  });

  Rhum.testSuite('isRequestSuccess()', () => {
    Rhum.testCase('should return true for success response payload', async () => {
      Rhum.asserts.assertEquals(isRequestSuccess(successResponse), true);
    });
    Rhum.testCase('should return false for failed response payload', async () => {
      Rhum.asserts.assertEquals(isRequestSuccess(failureResponse), false);
    });
  });
});

Rhum.run();
