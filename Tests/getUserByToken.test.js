const { getUserByToken } = require('../controller/user.controller');
const UserServices = require('../services/user.service');

jest.mock('../services/user.service'); // Mock UserServices to avoid actual DB calls

describe('Get User By Token Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        token: 'validToken123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return the user if token is valid and user exists', async () => {
    const decodedTokenMock = { _id: 'userId123' };
    const userMock = { _id: 'userId123', email: 'test@example.com', name: 'Test User' };

    UserServices.verifyAccessToken.mockResolvedValue(decodedTokenMock);
    UserServices.getUserById.mockResolvedValue(userMock);

    await getUserByToken(req, res, next);

    expect(UserServices.verifyAccessToken).toHaveBeenCalledWith('validToken123', 'secret');
    expect(UserServices.getUserById).toHaveBeenCalledWith('userId123');
    expect(res.json).toHaveBeenCalledWith(userMock);
  });

  it('should return an error if user does not exist', async () => {
    const decodedTokenMock = { _id: 'userId123' };

    UserServices.verifyAccessToken.mockResolvedValue(decodedTokenMock);
    UserServices.getUserById.mockResolvedValue(null); // Simulate no user found

    await getUserByToken(req, res, next);

    expect(UserServices.verifyAccessToken).toHaveBeenCalledWith('validToken123', 'secret');
    expect(UserServices.getUserById).toHaveBeenCalledWith('userId123');
    expect(next).toHaveBeenCalledWith(new Error('User not found'));
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next with an error if token is invalid', async () => {
    const error = new Error('Invalid token');
    UserServices.verifyAccessToken.mockRejectedValue(error); // Simulate token verification failure

    await getUserByToken(req, res, next);

    expect(UserServices.verifyAccessToken).toHaveBeenCalledWith('validToken123', 'secret');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors and call next with error', async () => {
    const error = new Error('Unexpected error');
    UserServices.verifyAccessToken.mockResolvedValue({ _id: 'userId123' });
    UserServices.getUserById.mockRejectedValue(error); // Simulate unexpected error on fetching user

    await getUserByToken(req, res, next);

    expect(UserServices.verifyAccessToken).toHaveBeenCalledWith('validToken123', 'secret');
    expect(UserServices.getUserById).toHaveBeenCalledWith('userId123');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
  });
});
