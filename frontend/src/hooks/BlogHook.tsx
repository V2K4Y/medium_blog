import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

interface BlogResponse {
    id: string,
    title: string,
    content: string,
    author: {
        name: string,
    }
}

export const useBlog = ( {id}: {id: string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogResponse>();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog?id=${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(res => {
            setBlog(res.data.post);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.message);
            navigate('/blogs');
        })
    }, [])
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogResponse[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/blog/bulk`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then( res => {
            setBlogs(res.data.posts);
            setLoading(false);
        }).catch( error => {
            console.log(error);
            navigate('/signin')
        })
    }, [])

    return {
        loading, blogs
    }
}