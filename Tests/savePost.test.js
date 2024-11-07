const { savePost } = require('../controller/post.controller');
const PostService = require('../services/post.service');

jest.mock('../services/post.service'); // Mock PostService to avoid actual DB calls

describe('savePost Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        description: 'Test description',
        date: '2024-11-04',
        fromCity: 'CityA',
        toCity: 'CityB',
        peopleAmount: 4,
        priceAmount: 100,
        token: 'testToken123'
      }
    };
    res = {
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and post data if savePost is successful', async () => {
    const postMockData = { id: 'postId123', description: 'Test description' };
    PostService.savePost.mockResolvedValue(postMockData);

    await savePost(req, res, next);

    expect(PostService.savePost).toHaveBeenCalledWith({
      description: 'Test description',
      date: '2024-11-04',
      fromCity: 'CityA',
      toCity: 'CityB',
      peopleAmount: 4,
      priceAmount: 100
    }, 'testToken123');
    
    expect(res.json).toHaveBeenCalledWith({ status: true, success: postMockData });
  });

  it('should call next with an error if savePost throws an error', async () => {
    const error = new Error('Database error');
    PostService.savePost.mockRejectedValue(error);

    await savePost(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should handle missing required fields in request body', async () => {
    req.body.description = null; // Simulating a missing field

    await savePost(req, res, next);

    // Expect `PostService.savePost` not to be called if there is invalid input
    expect(PostService.savePost).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error('Invalid input data'));
  });
});
