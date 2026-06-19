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
    
    const [toast, setToast] = useState(false);
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
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 5000);
            console.log(response.data);
        } catch (err) {
            setError(err.message);
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
                                <div className="dropdown dropdown-bottom w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Gender:</span>
                                    </div>
                                    <div tabIndex={0} role="button" className="input input-bordered flex items-center justify-between w-full max-w-xs bg-base-100 cursor-pointer capitalize">
                                        {gender ? gender : "Select Gender"}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-w-xs z-[1] border border-base-300">
                                        <li>
                                            <label className="flex items-center gap-3 cursor-pointer py-2">
                                                <input 
                                                    type="radio" 
                                                    name="gender-option" 
                                                    value="male" 
                                                    checked={gender === "male" || gender === "Male"} 
                                                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                                                    className="radio radio-primary radio-sm" 
                                                />
                                                <span>Male</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex items-center gap-3 cursor-pointer py-2">
                                                <input 
                                                    type="radio" 
                                                    name="gender-option" 
                                                    value="female" 
                                                    checked={gender === "female" || gender === "Female"} 
                                                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                                                    className="radio radio-primary radio-sm" 
                                                />
                                                <span>Female</span>
                                            </label>
                                        </li>
                                        <li>
                                            <label className="flex items-center gap-3 cursor-pointer py-2">
                                                <input 
                                                    type="radio" 
                                                    name="gender-option" 
                                                    value="others" 
                                                    checked={gender === "others" || gender === "Others" || gender === "other" || gender === "Other"} 
                                                    onChange={(e) => setGender(e.target.value.toLowerCase())}
                                                    className="radio radio-primary radio-sm" 
                                                />
                                                <span>Others</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
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
                                        <span className="label-text">Skills:</span>
                                    </div>
                                    <input 
                                        type="text"
                                        value={skills}
                                        className="input input-border w-full max-w-xs"
                                        onChange={(e) => setSkills(e.target.value)}
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
            { toast && (
            <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>  
            )}
        </>
    );
}   

export default EditProfile;