const PostService = require('../services/post.service');

exports.savePost = async (req, res, next) => {
    try {
        const { description, date, fromCity, toCity, peopleAmount, priceAmount, token } = req.body;
        
        console.log('Request body:', req.body);
        
        let PostData = await PostService.savePost({ description, date, fromCity, toCity, peopleAmount, priceAmount }, token);
        
        res.json({ status: true, success: PostData });

    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await PostService.getAllPosts();
        res.json(allPosts);
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}
