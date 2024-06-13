export const BlogSkeleton = () => {
    return (
        <div className="animate-pulse grid grid-rows-4 space-y-2 p-4 border-b border-gray-300">
            <div className="grid grid-cols-12 row-span-1 items-center">
                <div className="rounded-full bg-slate-400 h-5 w-5 col-span-1"></div>
                <div className="h-2 bg-slate-400 rounded col-span-3"></div>
            </div>
            <div className="row-span-2 grid grid-rows-2">
                <div className="h-2 bg-slate-400 rounded row-span-1"></div>
                <div className="h-2 bg-slate-400 rounded row-span-1"></div>
            </div>
            <div className="row-span-1">
                <div className="h-2 w-1/3 bg-slate-400 rounded"></div>
            </div>
        </div>
    )
}

export const TopBarSkeleton = () => {
    return (
        <div className="animate-pulse grid grid-cols-10 px-10 w-screen py-5">
            <div className="rounded-xl bg-gray-400 h-10 col-span-1"></div>
            <div className="col-span-8"></div>
            <div className="rounded-full bg-gray-400 h-8 w-8 col-span-1"></div>
        </div>
    )
}