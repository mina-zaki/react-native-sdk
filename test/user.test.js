import User from '../src/modules/user';
import ApiService from '../src/tools/apiService';

jest.mock('../src/tools/apiService', () => ({
  call: jest.fn().mockResolvedValue({}),
}));

describe('Tenant module', () => {
  test('getUser calls ApiService', () =>
    User.getUser('1').then(() =>
      expect(ApiService.call).toBeCalledWith('/users/1'),
    ));

  test('getUserInvites calls ApiService', () =>
    User.getUserInvites('1').then(() =>
      expect(ApiService.call).toBeCalledWith('/users/1/invites'),
    ));

  test('acceptUserInvite calls ApiService', () =>
    User.acceptUserInvite('1', '2').then(() =>
      expect(ApiService.call).toBeCalledWith('/users/1/invites/2', 'PATCH', { status: 'accepted' }),
    ));

  test('declineUserInvite calls ApiService', () =>
    User.declineUserInvite('1', '2').then(() =>
    expect(ApiService.call).toBeCalledWith('/users/1/invites/2', 'PATCH', { status: 'declined' }),
    ));
});
