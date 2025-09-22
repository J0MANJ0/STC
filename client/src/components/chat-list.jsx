import React, { useEffect } from 'react'
import useChat from '../store/use-chat-store'
import useAuth from '../store/use-auth-store'
import UserSkeleton from './user-skeleton'
import NoChat from './no-chat'

const ChatList = () => {
    const { getChats, chats, usersLoading, setSelectedUser } = useChat()
    const { onlineUsers } = useAuth()

    useEffect(() => {
        getChats()
    }, [getChats])

    if (usersLoading) return <UserSkeleton />
    if (chats.length === 0) return <NoChat />

    return (
        <>
            {chats.map((chat) => (
                <div
                    key={chat._id}
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => setSelectedUser(chat)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
                            <div className="size-12 rounded-full">
                                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
                    </div>
                </div>
            ))}
        </>
    );

}

export default ChatList