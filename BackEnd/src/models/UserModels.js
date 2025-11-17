let db = null;

export const initUserModel = (connection) => {
    db = connection;    
    return {
        getAll : async () => {
            const [row] = await db.query('SELECT * FROM users');
            return row;
    },  
        // create : async (id,name,email,password,role) =>{
        //     const sql = 'INSERT INTO users (id,name,email,password,role) VALUES (?,?,?,?,?)';
        //     const [result] = await db.query(sql,[id,name,email,password,role]);
        //     return {
        //         insertId : result.insertId,
        //         message : "Tạo người dùng thành công"
        //     };  
        // },
        put : async (id,name,email,password,role) =>{
            const sql = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
            const [result] = await db.query(sql,[name,email,password,role,id]);
            return {
                affectedRows : result.affectedRows,
                message : "Cập nhật người dùng thành công"
            };
        },
        delete : async (id) =>{
            const sql = 'DELETE FROM users WHERE id = ?';
            const [result] = await db.query(sql,[id]);
            return {
                affectedRows : result.affectedRows,
                message : "Xóa người dùng thành công"
            };  
        }

}
}