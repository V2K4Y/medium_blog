import { useNavigate, useParams } from "react-router-dom"
import { useBlog } from "../hooks/BlogHook";
import { TopBar } from "../components/TopBar";
import { Spinner } from "../components/InputForm";
export const FullBlog =  () => {

    const navigate = useNavigate();
    if(!localStorage.getItem('token')) {
        console.log(localStorage.getItem('token'));
        navigate('/signin');
    } else {
        
        console.log(localStorage.getItem('token'));
    }
    const { id } = useParams();
    console.log(id);
    const { loading, blog } = useBlog({id: id || ''});

    if(loading) {
        return (
            <div className="flex justify-center items-center gap-3 h-screen text-2xl font-bold">
                <Spinner radius={5} color="black"/>
                Loading...
            </div>
        )
    }
    return (
        <div>
            <TopBar username={blog?.author.name || 'U'} />
            <div className="grid grid-cols-12 w-screen h-screen">
            <div className="col-span-8 px-10 py-20">
                <h1 className="text-5xl font-bold mb-5 capitalize">{blog?.title}</h1>
                <p className="text-sm text-gray-400 mb-7 italic">Posted on 2nd December 2023</p>
                <p className="text-md font-light">
                    {blog?.content}
                </p>
            </div>
            <div className="col-span-4 px-10 py-20 italic">
                <h1 className="font-semibold text-xl">About the author.</h1>
                <div className="flex gap-3 items-center">
                    <div className="h-fit">
                      <div className={`flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full text-white text-md`}>
                        <div>{blog?.author.name[0].toUpperCase()}</div>
                      </div>
                    </div>
                    <div>
                        <p className="font-normal capitalize text-sm">{blog?.author.name}</p>
                        <p className="font-extralight text-xs text-gray-500">Contributed to this post.</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}