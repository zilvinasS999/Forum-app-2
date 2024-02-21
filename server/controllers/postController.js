const mongoose = require('mongoose');
const resSend = require('../plugins/resSend');
const postSchema = require('../schemas/postSchema');
const topicSchema = require('../schemas/topicSchema');

module.exports = {
  createPost: async (req, res) => {
    try {
      const { content, imageUrl, youtubeUrl } = req.body;
      const { topicId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return resSend(res, false, null, 'Invalid topicId');
      }

      if (!content) {
        return resSend(res, false, null, 'Content cannot be empty');
      }

      const topicExists = await topicSchema.findById(topicId);
      if (!topicExists) {
        return resSend(res, false, null, 'Topic does not exist');
      }

      const userId = req.user._id;

      const newPost = new postSchema({
        content,
        topic: topicId,
        createdBy: userId,
        imageUrl,
        youtubeUrl,
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
  updatePostContent: async (req, res) => {
    try {
      const { postId } = req.params;
      const { newContent } = req.body;
      const userId = req.user._id;

      if (!newContent || newContent.trim() === '') {
        return resSend(res, false, null, 'New content is required');
      }

      const post = await postSchema.findById(postId);

      if (!post) {
        return resSend(res, false, null, 'Post not found');
      }

      if (post.createdBy.toString() !== userId.toString()) {
        return resSend(res, false, null, 'Unauthorized to edit this post');
      }

      post.content = newContent;
      await post.save();

      resSend(res, true, { post }, 'Post updated successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error updating post content');
    }
  },
};
