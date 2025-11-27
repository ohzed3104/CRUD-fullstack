import env from 'dotenv';
import jwt from 'jsonwebtoken';
env.config();

const JwtUser = (req, res, next) => {
  const whitelist = ['/api/auth/login', '/api/auth/register'];

  if (whitelist.includes(req.originalUrl)) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized ' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user =  {
       id: decoded.id,       
      email : decoded.email,
      role: decoded.role  
    }
    console.log("Decoded JWT:", req.user); 
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized ' });
  }
};

export default JwtUser;
