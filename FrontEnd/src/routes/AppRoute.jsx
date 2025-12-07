import {Routes,Route} from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import {Register} from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoute(){
    return (
    <Routes>
       <Route path="/login" element={<Login/>}/> 
       <Route path="/register" element={<Register/>}/>  
       <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>           
    </Routes>
    )
}
export default AppRoute;