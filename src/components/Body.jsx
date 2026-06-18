import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, ENDPOINTS } from "../utils/constants";
import { useEffect } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userSlice);

  useEffect(() => {
    const fetchUser = async () => {
      if (userData) return;
      try {
        const res = await axios.get(BASE_URL + ENDPOINTS.PROFILE_VIEW, {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        console.log(err);
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate]);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
