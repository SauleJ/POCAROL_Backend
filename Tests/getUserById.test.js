const { getUserById } = require('../controller/user.controller');
const UserServices = require('../services/user.service');

jest.mock('../services/user.service'); // Mock UserServices to avoid actual DB calls

describe('Get User By ID Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        userID: 'user123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return the user if user exists', async () => {
    const userMock = { _id: 'user123', email: 'test@example.com', name: 'Test User' };

    UserServices.getUserById.mockResolvedValue(userMock);

    await getUserById(req, res, next);

    expect(UserServices.getUserById).toHaveBeenCalledWith('user123');
    expect(res.json).toHaveBeenCalledWith(userMock);
  });

  it('should call next with an error if user does not exist', async () => {
    UserServices.getUserById.mockResolvedValue(null); // Simulate no user found

    await getUserById(req, res, next);

    expect(UserServices.getUserById).toHaveBeenCalledWith('user123');
    expect(next).toHaveBeenCalledWith(new Error('User not found'));
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors and call next with the error', async () => {
    const error = new Error('Unexpected error');
    UserServices.getUserById.mockRejectedValue(error); // Simulate unexpected error

    await getUserById(req, res, next);

    expect(UserServices.getUserById).toHaveBeenCalledWith('user123');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
  });
});
