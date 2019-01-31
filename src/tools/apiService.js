import tokenProvider from './tokenProvider';
import environmentProvider from './environmentProvider';

/**
 * @private
 * Makes GET http request with access_token
 * @param {string} path - resource path
 * @param {string} [method = 'GET'] - HTTP method
 * @param {object} [body = null] - HTTP method
 * @returns {Promise}
 */
async function call(path, method = 'GET', body = null) {
  const token = await tokenProvider.get();
  const { apiUri } = environmentProvider.get();

  if (!token) {
    throw Error('OLT Browser SDK: No authorized user found');
  }

  return fetch(`${apiUri}${path}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    const base = { response, httpStatusCode: response.status };
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const json = await response.json();
      return { ...base, ...json };
    }
    return base;
  });
}

export default {
  call,
};
