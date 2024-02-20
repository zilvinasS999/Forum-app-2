const resSend = require('../plugins/resSend');
const topicSchema = require('../schemas/topicSchema');
const postSchema = require('../schemas/postSchema');
const userSchema = require('../schemas/userSchema');

module.exports = {
  createTopic: async (req, res) => {
    console.log(req.body);
    try {
      const defaultDescription = 'Default Description';
      const defaultCategory = 'General';
      const {
        title,
        description = defaultDescription,
        category = defaultCategory,
      } = req.body;
      console.log('Decoded token user info:', req.user);
      const userId = req.user._id;

      console.log('User role from token:', req.user.role);
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
        description,
        category,
        createdBy: userId,
      });

      console.log('Creating new topic:', newTopic);

      await newTopic.save();

      console.log('New topic created successfully:', newTopic);

      await userSchema.findByIdAndUpdate(
        userId,
        { $push: { topics: newTopic._id } },
        { new: true, useFindAndModify: false }
      );

      return resSend(
        res,
        true,
        { topic: newTopic },
        'Topic created successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error creating topic', 500);
    }
  },
  getAllTopics: async (req, res) => {
    try {
      const topics = await topicSchema.find({ mainTopic: null });
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

      if (!newTitle || newTitle.trim() === '') {
        return resSend(res, false, null, 'New title is required');
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
  createSubTopic: async (req, res) => {
    const { title, description = '', category } = req.body;
    const { mainTopicId } = req.params;
    const userId = req.user._id;

    if (!title) {
      return resSend(res, false, null, 'Title and description are required');
    }

    try {
      const mainTopicExists = await topicSchema.findById(mainTopicId);
      if (!mainTopicExists) {
        return resSend(res, false, null, 'Main topic not found');
      }

      const subTopic = new topicSchema({
        title,
        description,
        category,
        mainTopic: mainTopicId,
        createdBy: req.user._id,
        mainTopic: mainTopicId,
      });
      await subTopic.save();

      resSend(res, true, { subTopic }, 'Subtopic created successfully');
    } catch (error) {
      console.error('Error creating subtopic:', error);
      resSend(res, false, null, 'Error creating subtopic');
    }
  },
  getSubTopics: async (req, res) => {
    const { mainTopicId } = req.params;

    try {
      const subTopics = await topicSchema
        .find({ mainTopic: mainTopicId })
        .populate('createdBy', 'username');

      if (subTopics.length === 0) {
        return resSend(
          res,
          false,
          null,
          'No subtopics found for the given main topic'
        );
      }
      resSend(
        res,
        true,
        { subTopics },
        'Subtopics retrieved successfully',
        subTopics
      );
    } catch (error) {
      console.error('Error retrieving subtopics:', error);
      resSend(res, false, null, 'Error retrieving subtopics');
    }
  },
};
