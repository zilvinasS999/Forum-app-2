const resSend = require('../plugins/resSend');
const messageSchema = require('../schemas/messageSchema');
const userSchema = require('../schemas/userSchema');

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const { recipientId, content } = req.body;
      const senderId = req.user._id;

      console.log(recipientId);

      const recipientExists = await userSchema.findById(recipientId);
      if (!recipientExists) {
        return resSend(res, false, null, 'Recipient does not exist');
      }

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
  updateMessageReadStatus: async (req, res) => {
    try {
      const { messageId } = req.params;
      const updatedMessage = await messageSchema.findByIdAndUpdate(
        messageId,
        { read: true },
        { new: true }
      );

      if (!updatedMessage) {
        return resSend(res, false, null, 'Message not found');
      }
      resSend(
        res,
        true,
        { updatedMessage },
        'Message read status updated successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error updating message read status');
    }
  },
  getUnreadMessageCount: async (req, res) => {
    try {
      const userId = req.user._id;
      const unreadCount = await messageSchema.countDocuments({
        recipient: userId,
        read: false,
      });
      resSend(
        res,
        true,
        { unreadCount },
        'Unread messages count fetched successfully'
      );
    } catch (error) {
      console.error(error);
      resSend(res, false, null, 'Error fetching unread messages count');
    }
  },
};
