import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connectionSlice);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true,
            });
            dispatch(addConnection(res.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (connections === null) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center my-10 px-4">
            <h1 className="text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Connections
            </h1>
            
            {connections.length === 0 ? (
                <div className="text-gray-500 font-semibold text-lg mt-10 text-center">
                    No connections found yet. Try liking more profiles!
                </div>
            ) : (
                <div className="w-full max-w-xl space-y-4">
                    {connections.map((user) => {
                        if (!user) return null;
                        const { _id, firstName, lastName, photoURL, age, gender, about } = user;
                        
                        return (
                            <div 
                                key={_id} 
                                className="card card-side bg-base-100 shadow-md border border-base-300 p-4 items-center gap-4 hover:shadow-lg transition-all duration-200"
                            >
                                <div className="avatar">
                                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                        <img 
                                            src={photoURL || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} 
                                            alt={`${firstName} ${lastName}`} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <h2 className="card-title text-xl font-bold">
                                        {firstName} {lastName}
                                    </h2>
                                    {(age || gender) && (
                                        <p className="text-sm text-gray-500 capitalize">
                                            {gender ? `${gender}` : ""}{age ? `, ${age} years old` : ""}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                                        {about || "No bio description provided."}
                                    </p>
                                </div>
                                
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-sm px-4">Chat</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Connections;