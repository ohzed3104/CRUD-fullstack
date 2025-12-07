import connectDB from "../config/db.js";

let db;
(async () => {
  db = await connectDB();  
})();

const pair = (a, b) => (a < b ? [a, b] : [b, a]);

const findFriend = async (u1, u2) => {
  try {
    const [rows] = await db.query(
      `
      SELECT 1 FROM friends
      WHERE (
        (user1_id = ? AND user2_id = ?)
        OR
        (user1_id = ? AND user2_id = ?)
      )
      LIMIT 1
      `,
      [u1, u2, u2, u1]
    );

    return rows.length > 0;
  } catch (err) {
    console.error("findFriend error:", err);
    return false;
  }
};

export const jwtMess = async (req, res, next) => {
  const me = Number(req.user.id);
  const recipient = Number(req.body.toUserId);

  if (!recipient) {
    return res.status(400).json({ message: "Thiếu toUserId" });
  }

  if (me !== recipient) {
    const [u1, u2] = pair(me, recipient);

    const isFriend = await findFriend(u1, u2);

    if (!isFriend) {
      return res.status(403).json({ message: "Bạn chỉ có thể nhắn tin với bạn bè" });
    }
  }

  next();
};

export default jwtMess;
