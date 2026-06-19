import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [emailId, setEmailId] = useState("maheshbabu@hotmail.com");
    const [password, setPassword] = useState("MSms19@$");
    const [error, setError] = useState("");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = async () => {
        console.log("userLogin called", { emailId, password });
        setError("");
        try {
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
            dispatch(addUser(result.data));
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || err.response?.data || err.message || "Something Went Wrong");
            console.error(err);
        }
    };

    return (
      <div className="flex flex-col min-h-screen items-center justify-top bg-base-200 py-10 px-4">
        {/* Welcome Heading on Top */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Welcome to DevTinder
          </h1>
          <p className="text-gray-500 font-semibold">
            Find your perfect developer match
          </p>
        </div>

        {/* Card containing the login form */}
        <div className="card bg-base-100 w-full max-w-md shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold mb-4">
              Login
            </h2>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email ID</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Email ID" 
                  value={emailId} 
                  onChange={(e) => setEmailId(e.target.value)} 
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {error && (
                <div className="alert alert-error shadow-sm text-sm py-2">
                  <span>{error}</span>
                </div>
              )}

              <div className="card-actions justify-center mt-6">
                <button className="btn btn-primary w-full" onClick={userLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Link Below the Card */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            New to DevTinder?{" "}
            <button 
              className="link link-primary font-bold ml-1 focus:outline-none"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    );
};

export default Login;