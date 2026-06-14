import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Login = () => {

    const [emailId, setEmailId] = useState("maheshbabu@hotmail.com");
    const [password, setPassword] = useState("MSms19@$");
    const dispatch = useDispatch();
    const userLogin = async () => {
        console.log("userLogin called", { emailId, password });
        try{
            const result = await axios.post(
              "http://localhost:7777/login",
              {
                emailId,
                password,
              },
              {
                withCredentials: true,
              },
            );
            console.log("Result: ", result.data);
            dispatch( addUser(result.data));
        }catch(err){
            console.error("Login error:", err);
        }
    }

    return (
      <div className="flex min-h-screen items-start justify-center bg-base-200 pt-10">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <label htmlFor="user-email">Email</label>
            <input className="input input-bordered w-full" type="email" id="user-email" placeholder="User Email" value={emailId}
            onChange={(e) => setEmailId(e.target.value)}/>
            <label htmlFor="user-password">Password</label>
            <input className="input input-bordered w-full" type="password" id="user-password" placeholder="Password" value={password}
            onChange= { (e) => setPassword(e.target.value)}/>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={userLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;