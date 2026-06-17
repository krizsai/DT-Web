import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {

    const feed = useSelector(store => store.feedSlice);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if(feed) return;
        try{
            const response = await axios.get(`${BASE_URL}/user/feed`, {
                withCredentials: true,
            });
            dispatch(addFeed(response.data));
        }catch(err){
            console.log(err);
        }
    }

    const handleAction = async (status, toUserId) => {
        try {
            await axios.post(`${BASE_URL}/connection/request/send/${status}/${toUserId}`, {}, {
                withCredentials: true,
            });
            dispatch(removeUserFromFeed(toUserId));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect( () => {
        getFeed();
    },[]);
    
    if (feed === null) return null;

    if (feed.length === 0) {
        return <div className="flex justify-center my-10 font-semibold text-lg text-gray-500">No new users found!</div>;
    }

    return (
        <div className="flex flex-wrap justify-center gap-6 my-10 px-4">
            {feed.map((user) => (
                <UserCard key={user._id} user={user} onAction={handleAction} />
            ))}
        </div>
    );

}

export default Feed;