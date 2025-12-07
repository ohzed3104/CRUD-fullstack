let userModel = null;

export const initUserController = (model) => {
    userModel = model;
    return {
        getUsers : async (req,res) => {
            try {
                const users = await userModel.getAll();
                res.json(users);
            } catch (error) {
                res.status(500).json({message : error.message});
            }
        },
        putUsers : async (req,res) => {
            try {
                const {id} = req.params;
                const {name,email,password,role} = req.body;
                if(!name||!email||!password){
                    return res.status(400).json({message : "Thiếu thông tin người dùng"});
                }
                const result = await userModel.put(id,name,email,password,role);
                res.status(200).json({
                    message : result.message,
                    affectedRows : result.affectedRows
                });
            } catch (error) {
                res.status(500).json({message : error.message});
            }
        },
        deleteUsers : async (req,res) => {
            try {
                const {id} = req.params;
                const result =await userModel.delete(id);
                res.status(200).json({
                    message : result.message,
                    affectedRows : result.affectedRows
                });
            } catch (error) {
                res.status(500).json({message : error.message});
            }
        }
    }
}