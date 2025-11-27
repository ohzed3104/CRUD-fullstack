// src/models/MessageModels.js
let db = null;

export const initMessageModel = (connection) => {
  db = connection;

  return {
    // Tạo tin nhắn (có to_user_id)
    createMessage: async (conversationId, fromUserId, toUserId, content) => {
      const sql = `
        INSERT INTO messages (conversation_id, from_user_id, to_user_id, content, timestamp)
        VALUES (?, ?, ?, ?, NOW())
      `;
      const [result] = await db.query(sql, [conversationId, fromUserId, toUserId, content]);
      const [rows] = await db.query(`SELECT * FROM messages WHERE id = ?`, [result.insertId]);
      return rows[0];
    },

    // Tìm hoặc tạo conversation
    getConversationBetweenUsers: async (userId1, userId2) => {
      const [u1, u2] = userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
      const [rows] = await db.query(
        `SELECT * FROM conversations WHERE user1_id = ? AND user2_id = ?`,
        [u1, u2]
      );
      return rows[0] || null;
    },

    createConversation: async (userId1, userId2) => {
      const [u1, u2] = userId1 < userId2 ? [userId1, userId2] : [userId2, userId1];
      const [result] = await db.query(
        `INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)`,
        [u1, u2]
      );
      const [rows] = await db.query(`SELECT * FROM conversations WHERE id = ?`, [result.insertId]);
      return rows[0];
    },

    updateConversation: async (conversationId, { lastMessage, lastSenderId }) => {
      const sql = `
        UPDATE conversations
        SET last_message = ?, last_sender_id = ?, updated_at = NOW()
        WHERE id = ?
      `;
      await db.query(sql, [lastMessage, lastSenderId, conversationId]);
      const [rows] = await db.query(`SELECT * FROM conversations WHERE id = ?`, [conversationId]);
      return rows[0];
    },
  };
};