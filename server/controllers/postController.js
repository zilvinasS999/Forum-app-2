const resSend = require('../plugins/resSend');
const postSchema = require('../schemas/postSchema');
const topicSchema = require('../schemas/topicSchema');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { content } = req.body;
      const { topicId } = req.params;

      if (!content) {
        return resSend(res, false, null, 'Posts cannot be empty');
      }

      const topicExists = await topicSchema.findById(topicId);
      if (!topicExists) {
        return resSend(res, false, null, 'Topic does not exist');
      }

      const userId = req.user._id;

      const newPost = new postSchema({
        content: content,
        topic: topicId,
        createdBy: userId,
      });
      await newPost.save();
      return resSend(res, true, { post: newPost }, 'Post created');
    } catch (error) {
      console.error(error);
      return resSend(res, false, null, 'Error creating post');
    }
  },
  getPostsByTopic: async (req, res) => {
    try {
      const { topicId } = req.params;
      const posts = await postSchema
        .find({ topic: topicId })
        .populate('createdBy', 'username');
      resSend(
        res,
        true,
        { posts },
        'Fetched all posts for the topic successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching posts for the topic');
    }
  },
  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await postSchema
        .findById(postId)
        .populate('createdBy', 'username');
      if (!post) {
        return resSend(res, false, null, 'Post not found');
      }
      resSend(res, true, { post }, 'Fetched post successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching post');
    }
  },
};
