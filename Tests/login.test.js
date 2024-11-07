const { login } = require('../controller/user.controller');
const UserServices = require('../services/user.service');

jest.mock('../services/user.service'); // Mock UserServices to avoid actual DB calls

describe('Login Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 200 and a token if login is successful', async () => {
    const userMock = {
      _id: 'userId123',
      email: 'test@example.com',
      comparePassword: jest.fn().mockResolvedValue(true)
    };

    UserServices.checkUser.mockResolvedValue(userMock);
    UserServices.generateAccessToken.mockResolvedValue('fakeToken123');

    await login(req, res, next);

    expect(UserServices.checkUser).toHaveBeenCalledWith('test@example.com');
    expect(userMock.comparePassword).toHaveBeenCalledWith('password123');
    expect(UserServices.generateAccessToken).toHaveBeenCalledWith(
      { _id: 'userId123', email: 'test@example.com' },
      'secret',
      '1h'
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: true, success: "sendData", token: 'fakeToken123' });
  });

  it('should call next with an error if email or password is missing', async () => {
    req.body.email = null;

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(new Error('Parameter are not correct'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next with an error if user does not exist', async () => {
    UserServices.checkUser.mockResolvedValue(null);

    await login(req, res, next);

    expect(UserServices.checkUser).toHaveBeenCalledWith('test@example.com');
    expect(next).toHaveBeenCalledWith(new Error('User does not exist'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should call next with an error if password is incorrect', async () => {
    const userMock = {
      _id: 'userId123',
      email: 'test@example.com',
      comparePassword: jest.fn().mockResolvedValue(false)
    };

    UserServices.checkUser.mockResolvedValue(userMock);

    await login(req, res, next);

    expect(userMock.comparePassword).toHaveBeenCalledWith('password123');
    expect(next).toHaveBeenCalledWith(new Error('Username or Password does not match'));
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle and log unexpected errors', async () => {
    const error = new Error('Unexpected error');
    UserServices.checkUser.mockRejectedValue(error);

    await login(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});


/// npx jest --detectOpenHandles
///to run test