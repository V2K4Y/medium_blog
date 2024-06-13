import { BlogCreateInput } from "@v_k_y/medium-common"
import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../Config"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [post, setPost] = useState<BlogCreateInput>({
        title: '',
        content: '',
    })
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(post.content == '' || post.title == '') {
            alert("Fields can't be empty")
            return;
        }
        try {
            const res = await axios.post(`${BACKEND_URL}/blog`, post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            alert('Blog published!');
            setPost({title: '', content: ''});
            console.log('Successfully created!', res.data);
        } catch (error) {
            alert('Something went wrong!\nCheck the console.')
            console.log(error);
        }
    }

    const handleDiscard = () => {
        navigate('/blogs');
    }

    return (
        <form onSubmit={handleSubmit} className="h-screen w-screen bg-gray-300 px-10 py-5 grid grid-rows-12 gap-3">
            <div className="flex justify-between text-white">
                <p className="text-2xl font-semibold bg-gray-500 px-3 py-1 rounded-full inline w-fit">Create a blog</p>
                <button className="bg-red-500 px-5 py-2 rounded-md text-xl border border-white" onClick={handleDiscard}>Discard</button>
            </div>
            <input value={post.title} type="text" placeholder="Title..." id="title" onChange={(e) => {
                setPost({
                    ...post,
                    title: e.target.value
                })
            }}
            className="w-full row-span-2 px-5 rounded-t-lg font-semibold text-5xl text-gray-800 outline-none" required/>
            <textarea value={post.content} placeholder="Content goes here..." id="content" onChange={(e) => {
                setPost({
                    ...post,
                    content: e.target.value
                })
            }}
            className="w-full row-span-8 p-5 outline-none rounded-b-lg text-xl text-gray-600" required/>
            <div className="text-md row-span-2 text-white">
                <button type="submit" className="bg-blue-500 px-5 py-2 rounded-md text-xl">Publish</button>
            </div>
        </form>
    )
}