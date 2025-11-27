let messageModel = null;

export const initMessageHelper = (model) => {
    messageModel = model;

    return {
        /**
         * Cập nhật thông tin conversation khi có tin nhắn mới
         * @param {number} conversationId
         * @param {object} lastMessageData
         */
        updateConversationOnNewMessage: async (conversationId, lastMessageData) => {
            try {
                // Lấy thông tin cuộc trò chuyện
                const conversation = await messageModel.getConversationById(conversationId);
                if (!conversation) {
                    throw new Error("Cuộc trò chuyện không tồn tại");
                }

                // Cập nhật thông tin cuối cùng, ví dụ lastMessage, lastUpdated
                const updatedConversation = await messageModel.updateConversation(conversationId, {
                    lastMessage: lastMessageData.content,
                    lastSenderId: lastMessageData.fromUserId,
                    updatedAt: new Date()
                });

                return updatedConversation;

            } catch (error) {
                console.error("Lỗi cập nhật conversation:", error);
                throw error;
            }
        }
    }
}
