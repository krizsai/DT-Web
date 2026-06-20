import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");

    const [emailId, setEmailId] = useState("maheshbabu@hotmail.com");
    const [password, setPassword] = useState("MSms19@$");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin ] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUpUser = async () => {
      setError("");
      try {
        const result = await axios.post(`${BASE_URL}/signup`, {
          firstName, 
          lastName, 
          age: age ? Number(age) : undefined, 
          gender: gender?.toLowerCase(), 
          about, 
          emailId, 
          password
        }, {withCredentials: true});
        console.log(result.data);
        userLogin();
      } catch (err) {
        setError(err.response?.data?.error || err.response?.data?.message || err.message || "Signup failed");
        console.error(err);
      }
    };

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
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            <div className="space-y-4">

            { !isLogin && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Age</span>
                  </label>
                  <input 
                    type="number" 
                    placeholder="Age" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value)} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Gender</span>
                  </label>
                  <select 
                    value={gender} 
                    onChange={(e) => setGender(e.target.value)} 
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">About</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="About" 
                    value={about} 
                    onChange={(e) => setAbout(e.target.value)} 
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </>
              )}
            
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
                <button className="btn btn-primary w-full" onClick={ isLogin ? userLogin : handleSignUpUser}>
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  {isLogin ? "New to DevTinder?" : "Already have an account?"}{" "}
                  <button 
                    className="link link-primary font-bold ml-1 focus:outline-none"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Sign up here" : "Login here"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;