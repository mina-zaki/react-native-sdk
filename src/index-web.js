import { UserManager } from 'oidc-client';
import userManagerProvider from './tools/userManagerProvider';
import environmentProvider from './tools/environmentProvider';
import tokenProvider from './tools/tokenProvider';
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

const AUTH_CALLBACK_PATH = '/auth-callback';

/**
 * Main browser sdk module
 * TODO: add getting started block here
 * @param {Object} options
 * @param {string} [options.environment] - lightelligence environment.
 * avalaible options: 'dev', 'int', 'preview', 'prod'
 * @param {array} [options.scope = ['openid', 'profile', 'email', 'offline_access']] - openid scope
 * @param {string} options.clientId - registered app client id
 */
export default class BrowserSDK {
  constructor({
    environment,
    clientId,
    scope = ['openid', 'profile', 'email', 'offline_access'],
  }) {
    if (!environment || !clientId) {
      throw Error('OLT Browser SDK: Missing one or more init options.');
    }

    const baseUrl = environmentProvider.getBaseUrlFromEnv(environment);

    this.manager = new UserManager({
      authority: `https://id.${baseUrl}/v1/id/auth/realms/olt`,
      client_id: clientId,
      scope: scope.join(' '),
      response_type: 'id_token token',
      redirect_uri: `${window.location.origin}${AUTH_CALLBACK_PATH}`,
      post_logout_redirect_uri: window.location.origin,
    });

    // execute this code only on redirect from token issuer
    if (window.location.pathname === AUTH_CALLBACK_PATH) {
      this.manager
        .signinRedirectCallback()
        .then(() => {
          window.location = window.location.origin;
        })
        .catch(e => {
          throw new Error(e);
        });
    }

    userManagerProvider.set(this.manager);
    environmentProvider.set({
      apiUri: `https://api.${baseUrl}/v1`,
      clientId,
    });
  }

  /**
   * Redirects to login page if user is not logged in already
   * @param {Object} [options]
   * @param {string} [options.loginHint] - login_hint to forward email/username in keycloak.
   */
  login({ loginHint } = {}) {
    return this.manager.getUser().then(user => {
      tokenProvider.set(user.access_token);
      // ignore this code only on redirect from token issuer
      if (!user && window.location.pathname !== AUTH_CALLBACK_PATH) {
        this.manager.signinRedirect({ login_hint: loginHint });
      }
    });
  }

  /**
   * Redirects to the tenant selection page if the user is already logged in.
   * Otherwise it redirects to the keycloak login page.
   */
  changeTenant() {
    this.manager.signinRedirect();
  }

  /**
   * Logs user out
   */
  logout() {
    userManagerProvider.clear();
    this.manager.signoutRedirect();
  }

  /**
   * Return current user
   * @returns {Promise} user profile object
   */
  getCurrentUser() {
    return this.manager.getUser();
  }
}
