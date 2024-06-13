// import { Avatar } from "./BlogCard"

import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const TopBar = ({username}: {username: string}) => {
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    const handleClick = () => {
        setState(!state);
    }
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return (
        <div className="flex justify-between px-10 border-b border-gray-300 py-3 items-center h-fit">
            <div className="font-semibold text-xl cursor-pointer" onClick={() => {
                navigate('/blogs')
            }}>
                Medium
            </div>
            <div className="cursor-pointer relative" onClick={handleClick} >
                <div className={`flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full text-white text-xl`}>
                    <div>{username[0].toUpperCase()}</div>
                </div>
                <div className={`absolute right-7 w-max h-fit rounded-md bg-gray-200 ${state ? null : 'hidden'}`}>
                    <p className="text-md px-3 py-2 hover:bg-gray-400 hover:rounded-t-md" onClick={() => {
                        navigate('/profile')
                    }}>Profile</p>
                    <p className="text-md px-3 py-2 border-y border-white hover:bg-gray-400" onClick={() => {
                        navigate('/publish')
                    }}>Create a blog</p>
                    <p className="text-md px-3 py-2 cursor-pointer hover:bg-gray-400 hover:rounded-b-md" onClick={logout}>Logout</p>
                </div>
            </div>
        </div>
    )
}