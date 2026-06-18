import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await axios.post(
        BASE_URL + "/logout", {}, {withCredentials: true}
      );
      dispatch(removeUser());
      return navigate("/login"); 
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">💻 DevTinder</Link>
        </div>
        <div className="flex gap-2 display-flex">
          {user && (
              <span className="px-4 py-2 text-primary">{user.firstName}</span>
          )}
          {user && (
              <div className="dropdown dropdown-end mx-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Photo"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to = "/settings">Settings</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
