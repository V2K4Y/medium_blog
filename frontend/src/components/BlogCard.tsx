import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../Config";

export const BlogCard = ({id, username, title, content}: {id?: string, username: string, title: string, content: string}) => {
    const navigate = useNavigate();
    const [state, setState] = useState(false);
    const handleEdit = () => {
        alert('This function is in production!')
    }
    const handleDelete = () => {
        axios.delete(`${BACKEND_URL}/blog?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            console.log(res.data.msg);
            setState(false);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="flex flex-col gap-1 p-4 border-b border-gray-300">
            <div className="flex gap-1 items-center">
                <Avatar name={username} />
                <p className="text-gray-500 font-normal text-xs">{username}</p>
                <Circle />
                <p className="text-gray-500 font-thin text-xs">23rd June 2024</p>
            </div>
            <div>
                <div className="font-bold text-2xl font-sans cursor-pointer inline-block" onClick={() => {
                    navigate(`/blog/${id}`)
                }}>
                    {title}
                </div>
                <div className="text-gray-600 font-serif">
                    {content}
                </div>
            </div>
            <div className="text-xs flex justify-between items-center">
                <p className="text-gray-400">{Math.floor(content.length/100)} minute(s) read</p>
                <div className="text-lg relative cursor-pointer">
                    <p className="text-gray-400" onClick={() => {setState(!state)}}>...</p>
                    <div className={`${state ? null : 'hidden'} absolute bottom-5 left-2 w-fit h-fit rounded-xl bg-gray-300 text-sm`}>
                        <p className="px-4 py-2 border-b border-white hover:bg-gray-400 hover:rounded-t-xl" onClick={handleEdit}>Edit</p>
                        <p className="px-4 py-2 hover:bg-gray-400 hover:rounded-b-xl" onClick={handleDelete}>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Avatar =  ({name}: {name: string}) => {
    return(
        <div className={`flex items-center justify-center w-5 h-5 bg-gray-600 rounded-full text-white text-xs`}>
            <div>{name[0].toUpperCase()}</div>
        </div>
    )
}

const Circle = () => {
    return (
        <div className="w-1 h-1 bg-gray-500 rounded-full mx-1">

        </div>
    )
}