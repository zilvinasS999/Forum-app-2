const resSend = require('../plugins/resSend');
const topicSchema = require('../schemas/topicSchema');

module.exports = {
  createTopic: async (req, res) => {
    try {
      const { title } = req.body;
      console.log(req.body);

      if (req.user.role !== 'admin') {
        return resSend(
          res,
          false,
          null,
          'Topics can only be created by admins',
          403
        );
      }

      const newTopic = new topicSchema({
        title,
        createdBy: req.user._id,
      });

      await newTopic.save();

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
};
