const { getAllPosts } = require('../controller/post.controller');
const PostService = require('../services/post.service');

jest.mock('../services/post.service'); // Mock PostService to avoid actual DB calls

describe('getAllPosts Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should return all posts if getAllPosts is successful', async () => {
    const mockPosts = [
      { id: 'post1', description: 'Post 1' },
      { id: 'post2', description: 'Post 2' }
    ];
    
    PostService.getAllPosts.mockResolvedValue(mockPosts);

    await getAllPosts(req, res, next);

    expect(PostService.getAllPosts).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should call next with an error if getAllPosts throws an error', async () => {
    const error = new Error('Database error');
    PostService.getAllPosts.mockRejectedValue(error);

    await getAllPosts(req, res, next);

    expect(PostService.getAllPosts).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
    expect(res.json).not.toHaveBeenCalled();
  });
});
