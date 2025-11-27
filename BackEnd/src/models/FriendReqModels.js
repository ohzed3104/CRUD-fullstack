let db = null;

export const initFriendReqModel = (connection) => {
    db = connection;

    return {

        // GỬI YÊU CẦU
        postFriendReq: async (fromUserId, toUserId) => {

            const [existing] = await db.query(
                `SELECT id FROM friend_requests 
                 WHERE (
                        (from_user_id = ? AND to_user_id = ?) 
                     OR (from_user_id = ? AND to_user_id = ?)
                 )
                 AND status = 'pending'`,
                [fromUserId, toUserId, toUserId, fromUserId]
            );

            if (existing.length > 0) {
                throw new Error("Yêu cầu kết bạn đã tồn tại");
            }

            const sql = `
                INSERT INTO friend_requests (from_user_id, to_user_id, status) 
                VALUES (?, ?, 'pending')
            `;
            const [result] = await db.query(sql, [fromUserId, toUserId]);

            return {
                insertId: result.insertId,
                message: "Đã gửi yêu cầu kết bạn"
            };
        },


        // TÌM 1 LỜI MỜI
        findOne: async (criteria) => {
            let sql = 'SELECT * FROM friend_requests WHERE 1=1';
            const params = [];

            const fieldMap = {
                id: 'id',
                from_user_id: 'from_user_id',
                to_user_id: 'to_user_id',
                status: 'status'
            };

            for (const key in criteria) {
                if (fieldMap[key]) {
                    sql += ` AND ${fieldMap[key]} = ?`;
                    params.push(criteria[key]);
                }
            }

            const [rows] = await db.query(sql, params);
            return rows[0] || null;
        },

        // TÌM TRONG BẢNG FRIENDS
        findFriend: async (user1Id, user2Id) => {
            const [rows] = await db.query(
                `SELECT * FROM friends 
                 WHERE (user1_id = ? AND user2_id = ?) 
                    OR (user1_id = ? AND user2_id = ?)` ,
                [user1Id, user2Id, user2Id, user1Id]
            );
            return rows[0] || null;
        },

        // LẤY CÁC YÊU CẦU PENDING
        getFriendReqs: async (userId) => {
            const [rows] = await db.query(
                `SELECT fr.id, fr.from_user_id, fr.to_user_id, fr.status, fr.created_at,
                        u.name AS from_name
                 FROM friend_requests fr
                 JOIN users u ON fr.from_user_id = u.id
                 WHERE fr.to_user_id = ? AND fr.status = 'pending'
                 ORDER BY fr.created_at DESC`,
                [userId]
            );
            return rows;
        },


        // TRẢ LỜI YÊU CẦU (ACCEPT - DENY) — BẢN FIX KHÔNG DÙNG getConnection
        respondToFriendReq: async (requestId, userId, action) => {

            // Lấy thông tin request
            const [[request]] = await db.query(
                `SELECT from_user_id, to_user_id
                 FROM friend_requests
                 WHERE id = ? AND to_user_id = ? AND status = 'pending'`,
                [requestId, userId]
            );

            if (!request) return { affectedRows: 0 };

            const { from_user_id, to_user_id } = request;

            if (action === "accept") {
                // Update status
                await db.query(
                    `UPDATE friend_requests SET status = 'accepted' WHERE id = ?`,
                    [requestId]
                );

                // Thêm vào bảng friends
                await db.query(
                    `INSERT INTO friends (user1_id, user2_id)
                     VALUES (LEAST(?, ?), GREATEST(?, ?))`,
                    [from_user_id, to_user_id, from_user_id, to_user_id]
                );
            }

            if (action === "deny") {
                await db.query(
                    `UPDATE friend_requests SET status = 'denied' WHERE id = ?`,
                    [requestId]
                );
            }

            return { affectedRows: 1 };
        },
        getAllFriends : async (userId) => {
            const [rows] = await db.query(
                `SELECT f.id, 
                        CASE 
                            WHEN f.user1_id = ? THEN u2.id
                            ELSE u1.id
                        END AS friend_id,
                        CASE    
                            WHEN f.user1_id = ? THEN u2.name
                            ELSE u1.name
                        END AS friend_name,
                        f.created_at
                    FROM friends f
                    JOIN users u1 ON f.user1_id = u1.id
                    JOIN users u2 ON f.user2_id = u2.id
                    WHERE f.user1_id = ? OR f.user2_id = ?
                    ORDER BY f.created_at DESC`,
                [userId, userId, userId, userId]
            );
            return rows;


            
        }
    };
};
