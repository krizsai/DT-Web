import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequests } from "../utils/requestsSlice";


const Request = () => {

    const dispatch = useDispatch();
    const requests = useSelector( store => store.requestsSlice );

    const fetchRequests = async () => {
        try{
            const res = await axios.get(`${BASE_URL}/user/requests` , {withCredentials: true});
            console.log(res);
            dispatch(addRequests(res.data));

        }catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (requests === null) {
        return (
            <div className="flex justify-center my-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center my-10 px-4">
            <h1 className="text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Requests
            </h1>
            
            {requests.length === 0 ? (
                <div className="text-gray-500 font-semibold text-lg mt-10 text-center">
                    No requests found yet. Try liking more profiles!
                </div>
            ) : (
                <div className="w-full max-w-xl space-y-4">
                    {requests.map((request) => {
                        if (!request) return null;
                        const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserId;
                        
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
                                
                                <div className="flex card-actions">
                                    <button className="btn btn-success btn-sm px-4">Accept</button>
                                    <button className="btn btn-primary btn-sm px-4">Decline</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Request;