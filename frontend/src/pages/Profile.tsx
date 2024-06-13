import { TopBar } from "../components/TopBar";

export const Profile = () => {
    const name = localStorage.getItem('name') || 'Z';
    return (
        <div>
            <TopBar username={name}/>
            <div className="flex justify-center items-center mt-20">
                <div className="h-1/2 bg-gray-300 w-2/3 p-10 pt-20 rounded-3xl relative">
                    <p className="text-center text-4xl font-bold absolute top-5 left-1/3 text-gray-500">{name.split(' ')[0]}'s Profile</p>
                    <div className="flex gap-5 justify-centers items-center w-fit">
                        <div className="h-20 w-20 rounded-full text-5xl bg-gray-700 text-white flex justify-center items-center capitalize">
                            {name[0]}
                        </div>
                        <div className="text-3xl font-semibold items-center">
                            <p>{name}</p>
                            <p className="text-sm italic text-gray-500">{localStorage.getItem('email')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}