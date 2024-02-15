const resSend = require('../plugins/resSend');
const topicSchema = require('../schemas/topicSchema');
const postSchema = require('../schemas/postSchema');
const userSchema = require('../schemas/userSchema');

module.exports = {
  createTopic: async (req, res) => {
    try {
      const { title } = req.body;
      const userId = req.user._id;

      if (req.user.role !== 'admin') {
        return resSend(
          res,
          false,
          null,
          'Topics can only be created by admins'
        );
      }

      const newTopic = new topicSchema({
        title,
        createdBy: userId,
      });

      await newTopic.save();

      await userSchema.findByIdAndUpdate(
        userId,
        { $push: { topics: newTopic._id } },
        { new: true, useFindAndModify: false }
      );

      return resSend(res, true, { topic: newTopic }, null);
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error creating topic', 500);
    }
  },
  getAllTopics: async (req, res) => {
    try {
      const topics = await topicSchema.find({});
      resSend(res, true, { topics }, 'Fetched all topics successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching topics');
    }
  },
  getTopicById: async (req, res) => {
    try {
      const { topicId } = req.params;
      const topic = await topicSchema.findById(topicId);
      if (!topic) {
        return resSend(res, false, null, 'Topic not found');
      }
      resSend(res, true, { topic }, 'Fetched topic successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching topic');
    }
  },
  updateTopicTitle: async (req, res) => {
    try {
      const { topicId } = req.params;
      const { newTitle } = req.body;

      if (req.user.role !== 'admin') {
        return resSend(
          res,
          false,
          null,
          'Only admins can update the topic title'
        );
      }

      const updatedTopic = await topicSchema.findByIdAndUpdate(
        topicId,
        { title: newTitle },
        { new: true }
      );

      if (!updatedTopic) {
        return resSend(res, false, null, 'Topic was not found');
      }
      resSend(res, true, { updatedTopic }, 'Topic title updated successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error updating topic title');
    }
  },
  deleteTopicAndPosts: async (req, res) => {
    try {
      const { topicId } = req.params;

      if (req.user.role !== 'admin') {
        return resSend(res, false, null, 'Only admins can delete topics');
      }

      const topicDeleted = await topicSchema.findByIdAndDelete(topicId);
      if (!topicDeleted) {
        return resSend(res, false, null, 'Topic not found');
      }

      await postSchema.deleteMany({ topic: topicId });
      resSend(
        res,
        true,
        null,
        'Topic and associated posts deleted successfuly'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error deleting topic and posts');
    }
  },
  getAllTopicCounts: async (req, res) => {
    try {
      const topicCounts = await topicSchema.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]);
      resSend(res, true, { topicCounts }, 'Topic counts fetched successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching topic counts');
    }
  },
};
