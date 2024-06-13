import { useNavigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/BlogHook"
import { TopBar } from "../components/TopBar";
import { BlogSkeleton, TopBarSkeleton } from "../components/BlogSkeleton";

export const Blogs =  () => {
    const {loading, blogs} = useBlogs();
    const navigate = useNavigate();
    if(loading == true) {
        if(localStorage.getItem('token'))
        return (
            <div className="w-screen flex flex-col items-center">
                <TopBarSkeleton />
                <div className="w-3/5">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        )
        
        else {
            navigate('/signin')
        }
    }

    return (
        <div>
            <TopBar username={localStorage.getItem('name')|| "z"} />
            <div className="flex justify-center w-screen pt-2">
                <div className="flex flex-col min-w-3/5 max-w-4xl">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} id={blog.id} username = {blog.author.name} title={blog.title} content={blog.content} />
                    ))}
                </div>
                <div 
                className="fixed h-16 w-16 bottom-8 right-8 pt-2 rounded-full text-4xl text-center cursor-pointer border-2 border-gray-500"
                onClick={() => (navigate('/publish'))}
                >
                    +
                </div>
            </div>
        </div>
    )
}