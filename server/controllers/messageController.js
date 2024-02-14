const resSend = require('../plugins/resSend');
const messageSchema = require('../schemas/messageSchema');

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const { recipientId, content } = req.body;
      const senderId = req.user._id;

      const newMessage = new messageSchema({
        sender: senderId,
        recipient: recipientId,
        content: content,
      });

      await newMessage.save();

      resSend(res, true, { message: newMessage }, 'Message sent successfully');
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error sending message');
    }
  },
  getMessagesBetweenUsers: async (req, res) => {
    try {
      const { userOneId, userTwoId } = req.params;
      const messages = await messageSchema
        .find({
          $or: [
            { sender: userOneId, recipient: userTwoId },
            { sender: userTwoId, recipient: userOneId },
          ],
        })
        .populate('sender', 'username')
        .populate('recipient', 'username');
      resSend(
        res,
        true,
        { messages },
        'Fetched all messages between users successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching messages between users');
    }
  },
  getMessagesForUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const messages = await messageSchema
        .find({
          $or: [{ sender: userId }, { recipient: userId }],
        })
        .populate('sender', 'username')
        .populate('recipient', 'username');
      resSend(
        res,
        true,
        { messages },
        'Fetched all messages for the user successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching messages for the user');
    }
  },
};
