// BackEnd/src/controllers/FriendReqControllers.js

let FriendReqModel = null;

export const initFriendReqController = (model) => {
    FriendReqModel = model;

    return {

        // GỬI YÊU CẦU KẾT BẠN
        postFriendReq: async (req, res) => {
            try {
                const fromUserId = req.user.id;  
                const { toUserId } = req.body;

                if (!toUserId) {
                    return res.status(400).json({ message: "Thiếu thông tin người dùng" });
                }

                if (fromUserId === toUserId) {
                    return res.status(400).json({ message: "Không thể gửi yêu cầu cho chính mình" });
                }

                const friendExist = await FriendReqModel.findFriend(fromUserId, toUserId);
                if (friendExist) {
                    return res.status(400).json({ message: "Hai người đã là bạn bè" });
                }

                const reqExist = 
                    await FriendReqModel.findOne({ from_user_id: fromUserId, to_user_id: toUserId, status: 'pending' }) ||
                    await FriendReqModel.findOne({ from_user_id: toUserId, to_user_id: fromUserId, status: 'pending' });

                if (reqExist) {
                    return res.status(400).json({ message: "Yêu cầu kết bạn đã tồn tại" });
                }

                const result = await FriendReqModel.postFriendReq(fromUserId, toUserId);

                return res.status(201).json({
                    message: "Đã gửi yêu cầu kết bạn",
                    requestId: result.insertId
                });

            } catch (error) {
                console.error("Lỗi gửi friend request:", error);
                return res.status(500).json({
                    message: "Không thể gửi yêu cầu kết bạn",
                    error: error.message
                });
            }
        },

        // LẤY DANH SÁCH YÊU CẦU
        getFriendReqs: async (req, res) => {
            try {
                const userId = req.user.id;
                const requests = await FriendReqModel.getFriendReqs(userId);
                res.status(200).json(requests);

            } catch (error) {
                res.status(500).json({
                    message: "Không thể lấy danh sách yêu cầu kết bạn",
                    error: error.message
                });
            }
        },

        // TRẢ LỜI YÊU CẦU
        postToFriendReq: async (req, res) => {
            try {
                const userId = req.user.id;
                const requestId = req.params.id;
                const { action } = req.body; // 'accept' | 'deny'

                if (!['accept', 'deny'].includes(action)) {
                    return res.status(400).json({ message: "Hành động không hợp lệ" });
                }

                const result = await FriendReqModel.respondToFriendReq(requestId, userId, action);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: "Yêu cầu không tồn tại hoặc bạn không có quyền" });
                }

                res.json({ message: "Đã xử lý yêu cầu kết bạn" });

            } catch (error) {
                res.status(500).json({
                    message: "Không thể trả lời yêu cầu",
                    error: error.message
                });
            }
        },
         getAllFriends : async (req, res) => {
            try {
                const userId = req.user.id;
                const friends = await FriendReqModel.getAllFriends(userId);
                res.status(200).json(friends);
            } catch (error) {
                res.status(500).json({
                    message: "Không thể lấy danh sách bạn bè",
                    error: error.message
                });
            }
        }
    };
};