import ReactNativeSDK from '../src/index-react-native';
import environmentProvider from '../src/tools/environmentProvider';

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

});
