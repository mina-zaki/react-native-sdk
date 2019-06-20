import * as AppAuth from 'react-native-app-auth';
import ReactNativeSDK from '../src/index-react-native';
import environmentProvider from '../src/tools/environmentProvider';
import tokenProvider from '../src/tools/tokenProvider';

describe('react native module', () => {

  const sdkOptions = { environment: 'int', clientId: 'abcdefg', redirectUrl: 'url' };

  describe('constructor', () => {
    it('throws error if constructor options are invalid', () => {
      expect(() => new ReactNativeSDK()).toThrowError();
      expect(() => new ReactNativeSDK({ environment: 'int' })).toThrowError();
      expect(() => new ReactNativeSDK({ clientId: 'abcdefg' })).toThrowError();
    });

    it('creates configuration', () => {
      const sdk = new ReactNativeSDK(sdkOptions);
      expect(sdk.config).toBeDefined();
    });

    it('sets EnvironmentProvider', () => {
      const sdk = new ReactNativeSDK(sdkOptions); // eslint-disable-line no-unused-vars
      expect(environmentProvider.get()).toBeDefined();
    });
  });

  describe('login',  () => {
    it('set the token', async () => {
      const accessToken = 'abcde';
      const sdk = new ReactNativeSDK(sdkOptions);
      tokenProvider.set = jest.fn();
      AppAuth.authorize = jest.fn().mockReturnValue({accessToken});

      await sdk.login();

      expect(tokenProvider.set.mock.calls.length).toBe(1);
    });
  });

  describe('logout',  () => {
    it('cleared the token', async () => {
      const sdk = new ReactNativeSDK(sdkOptions);
      tokenProvider.clear = jest.fn();
      AppAuth.revoke = jest.fn();

      await sdk.logout();

      expect(tokenProvider.clear.mock.calls.length).toBe(1);
      expect(AppAuth.revoke.mock.calls.length).toBe(1);
    });
  });

});
