import ApiService from '../src/tools/apiService';
import tokenProvider from '../src/tools/tokenProvider';
import environmentProvider from '../src/tools/environmentProvider';

const defaultHeaders = { 'content-type': 'application/json' };
describe('ApiService.call', () => {
  beforeEach(() => {
    tokenProvider.set('abcdefg');
    environmentProvider.set({
      apiUri: 'http://example.com'
    });
    fetch.resetMocks();
  });

  it('throws error if no user is authorized', () => {
    tokenProvider.clear();
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }), {
      headers: defaultHeaders
    });

    expect(ApiService.call('/test-uri')).rejects.toEqual(
      new Error('OLT Browser SDK: No authorized user found')
    );
  });

  it('returns promise with response', () => {
    const responseMock = { data: '12345' };
    fetch.mockResponseOnce(JSON.stringify(responseMock), {
      headers: defaultHeaders
    });

    return ApiService.call('/test-uri').then(response => {
      expect(response.data).toEqual(responseMock.data);
      expect(response.httpStatusCode).toEqual(200);
    });
  });

  it('can handle json responses where content-type contains application/json as a substring', () => {
    const responseMock = { data: '12345' };
    fetch.mockResponseOnce(JSON.stringify(responseMock), {
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });

    return ApiService.call('/test-uri').then(response => {
      expect(response.data).toEqual(responseMock.data);
      expect(response.httpStatusCode).toEqual(200);
    });
  });

  it('can handle non json responses', () => {
    const responseMock = 'no json';

    fetch.mockResponseOnce(responseMock);

    return ApiService.call('/test-uri').then(response => {
      expect(response.httpStatusCode).toEqual(200);
      expect(response.data).toBeUndefined();
      expect(response.response.body).toEqual(responseMock);
    });
  });
});
