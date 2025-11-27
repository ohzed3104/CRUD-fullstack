let MessageModel = null;

export const initMessageController = (model) => {
    MessageModel = model;

    return {
        sendDirectMess: async (req, res) => {
    try {
        const fromUserId = req.user.id;
        const { toUserId, content } = req.body;

        // === KIỂM TRA DỮ LIỆU ===
        if (!toUserId || !content) {
            return res.status(400).json({ message: "Thiếu thông tin người nhận hoặc nội dung" });
        }

        // KIỂM TRA toUserId LÀ SỐ
        const toUserIdNum = parseInt(toUserId, 10);
        if (isNaN(toUserIdNum) || toUserIdNum <= 0) {
            return res.status(400).json({ message: "toUserId phải là số nguyên dương" });
        }

        if (fromUserId === toUserIdNum) {
            return res.status(400).json({ message: "Không thể gửi tin nhắn cho chính mình" });
        }

        // 1. Tìm hoặc tạo conversation
        let conversation = await MessageModel.getConversationBetweenUsers(fromUserId, toUserIdNum);
        if (!conversation) {
            conversation = await MessageModel.createConversation(fromUserId, toUserIdNum);
        }

        const conversationId = conversation.id;

        // 2. Tạo tin nhắn
        const newMessage = await MessageModel.createMessage(
            conversationId,
            fromUserId,
            toUserIdNum,  // DÙNG SỐ
            content
        );

        // 3. Cập nhật last message
        await MessageModel.updateConversation(conversationId, {
            lastMessage: content,
            lastSenderId: fromUserId
        });

        return res.status(201).json({
            message: "Đã gửi tin nhắn",
            data: newMessage
        });

    } catch (error) {
        console.error("Lỗi gửi tin nhắn:", error);
        return res.status(500).json({
            message: "Không thể gửi tin nhắn",
            error: error.message
        });
    }
}
    };
};