export const Avatar = ({username, size=5, fSize="xs", bgColor="gray"}: {username: string, size?: number, fSize?: string, bgColor?: string}) => {
    return (
        <div className="h-fit w-fit">
            <div className={`flex items-center justify-center w-${size} h-${size} bg-${bgColor}-600 rounded-full text-white text-${fSize}`}>
                <div>{username[0].toUpperCase()}</div>
            </div>
        </div>
    )
}