import bcrypt from 'bcrypt';
let db=null;

export const initAuthModel = (connection) => {
    db = connection;
    return {
        login : async (email,password) => {
            const sql = 'SELECT id,name,email,password,role FROM users WHERE email = ?';
            const [rows] = await db.query(sql,[email]);
            if(rows.length ===0){
                throw new Error("Email hoặc mật khẩu không đúng");
            }
            const user = rows[0];
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                throw new Error("Email hoặc mật khẩu không đúng");
            }
            
                return {
                id : user.id,
                name : user.name,
                email : user.email, 
                role: user.role
            }
            },
            
            create : async ({name,email,password,role}) => {
                const sql = 'INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)';
                const [exists] = await db.query('SELECT id FROM users WHERE email = ?',[email]);
                if(exists.length >0){
            throw new Error("Email đã tồn tại"       
            );
          }
          const [result] = await db.query(sql,[name,email,password,role]);
          return{
            userId :result.insertId,
            message : "Đăng ký thành công"
          }

        }
    }
}

