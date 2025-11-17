import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

let  authModel = null;
export const initAuthController = (model) => {
    authModel = model;
    const saltRounds = 10;
    return {
       login: async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await authModel.login(email, password);

        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        return res.status(200).json({
            access_token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
},

        register : async (req,res) => {
            try {
             
                const {name,email,password,role} = req.body;
                if(!name||!email||!password){
                    return res.status(400).json({message : "Thiếu thông tin đăng ký"});
                }
                 const hashPassword  = await bcrypt.hash(password,saltRounds);
                const result = await authModel.create({
                    name : name,
                    email : email,
                    password : hashPassword,
                    role :role
                });
                res.status(201).json({
                    message : result.message,
                    userId : result.userId
                })
                
            } catch (error) {
                res.status(500).json({message : error.message});
            }
        }

}
}