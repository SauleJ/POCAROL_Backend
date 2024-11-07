const { getPostsByUserId } = require('../controller/post.controller');
const PostService = require('../services/post.service');

jest.mock('../services/post.service'); // Mock PostService to avoid actual DB calls

describe('getPostsByUserId Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        userId: 'userId123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return 200 and posts data if getPostsByUserId is successful', async () => {
    const mockPosts = [
      { id: 'post1', description: 'Post 1' },
      { id: 'post2', description: 'Post 2' }
    ];
    
    PostService.getPostsByUserId.mockResolvedValue(mockPosts);

    await getPostsByUserId(req, res, next);

    expect(PostService.getPostsByUserId).toHaveBeenCalledWith('userId123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should call next with an error if getPostsByUserId throws an error', async () => {
    const error = new Error('Database error');
    PostService.getPostsByUserId.mockRejectedValue(error);

    await getPostsByUserId(req, res, next);

    expect(PostService.getPostsByUserId).toHaveBeenCalledWith('userId123');
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
