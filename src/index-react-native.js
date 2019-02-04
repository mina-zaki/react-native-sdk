import { authorize } from 'react-native-app-auth';
import tokenProvider from './tools/tokenProvider';
import environmentProvider from './tools/environmentProvider';
import User from './modules/user';
import Tenant from './modules/tenant';
import Client from './modules/client';
import Device from './modules/device';
import Timeseries from './modules/timeseries';
import Event from './modules/event';
import Certificate from './modules/certificate';
import DeviceType from './modules/deviceType';
import Consumption from './modules/consumption';

export { User, Tenant, Client, Device, DeviceType, Timeseries, Event, Certificate, Consumption };

/**
 * Main React Native sdk module
 * TODO: add getting started block here
 * @param {Object} options
 * @param {string} [options.environment] - lightelligence environment.
 * avalaible options: 'dev', 'int', 'preview', 'prod'
 * @param {array} [options.scope = ['openid', 'profile', 'email']] - openid scope
 * @param {string} options.clientId - registered app client id
 * @param {string} options.redirectUrl - application redirect url
 */
export default class ReactNativeSDK {
  constructor({
                environment,
                clientId,
                redirectUrl,
                scope = ['openid', 'profile', 'email'],
              }) {
    if (!environment || !clientId || !redirectUrl) {
      throw Error('OLT Browser SDK: Missing one or more init options.');
    }

    const baseUrl = environmentProvider.getBaseUrlFromEnv(environment);

    this.config = {
      serviceConfiguration: {
        authorizationEndpoint: `https://id.${baseUrl}/v1/id/auth/realms/olt/protocol/openid-connect/auth`,
        tokenEndpoint: `https://id.${baseUrl}/v1/id/auth/realms/olt/protocol/openid-connect/token`,
      },
      clientId,
      redirectUrl,
      scopes: scope,
    };

    environmentProvider.set({
      apiUri: `https://api.${baseUrl}/v1`,
      clientId,
    });
  }

  /**
   * Redirects to login page if user is not logged in already
   */
  async login() {
    const token = await authorize(this.config);
    tokenProvider.set(token.accessToken);
    return token;
  }

  /**
   * Logs user out
   */
  // logout() {
  //   tokenProvider.clear();
  // }

}
