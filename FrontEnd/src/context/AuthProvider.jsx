import {  useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export const AuthProvider = ({children}) => {
 const [user, setUser] = useState(null);
 const [token, setToken] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(()=>{
  const storetoken = localStorage.getItem("access_token");
  const storeuser = localStorage.getItem("user");
  if(storetoken&&storeuser){
    setToken(storetoken)
    setUser(JSON.parse(storeuser))
  }
  setLoading(false);

 },[])
 const login = ({user,token}) => {
  setUser(user);
  setToken(token);
 }
 const logout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
 }
  return(
    <AuthContext.Provider value={{user,token,loading,login,logout}}>
    {children}
  </AuthContext.Provider>
  ) 
}