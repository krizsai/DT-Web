import { useState } from "react";
import UserCard from "./UserCard"; 
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";   
import { useDispatch } from "react-redux";

const EditProfile = ( {user} ) =>   {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    
    
    const [error, setError] = useState(""); 

    const saveProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${BASE_URL}/profile/edit`, {
                firstName,
                lastName,
                age,
                gender,
                about,
                skills,
                photoURL
            }, {
                withCredentials: true,
            });
            dispatch(addUser(response?.data?.data));
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">First Name:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={firstName}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Last Name:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={lastName}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Age:</span>
                                    </div>
                                    <input 
                                        type="number"
                                        value={age}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={gender}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">About:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={about}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Photo URL:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={photoURL}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                    />
                                </label>
                                <p className="text-red-500">{error}</p>
                                <div className="card-actions justify-center m-2">
                                    <button className="btn btn-primary" onClick={saveProfile}>
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{firstName, lastName, age, gender, about, skills, photoURL}} />
            </div>
        </>
    );
}   

export default EditProfile;