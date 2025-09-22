import React, { useEffect } from 'react'
import useChat from '../store/use-chat-store'
import useAuth from '../store/use-auth-store'
import { XIcon } from 'lucide-react'

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChat()
    const { onlineUsers } = useAuth()

    const userOnline = onlineUsers.includes(selectedUser._id)

    useEffect(() => {
        const handleEscKey = e => {
            if (e.key === 'Escape') selectedUser(null)

        }

        window.addEventListener('keydown', handleEscKey)

        return () => window.removeEventListener('keydown', handleEscKey)
    }, [selectedUser])

    return (
        <div
            className="flex justify-between items-center bg-slate-800/50 border-b
   border-slate-700/50 max-h-[84px] px-6 flex-1"
        >
            <div className="flex items-center space-x-3">
                <div className={`avatar ${userOnline ? "online" : "offline"}`}>
                    <div className="w-12 rounded-full">
                        <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                    </div>
                </div>

                <div>
                    <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
                    <p className="text-slate-400 text-sm">{userOnline ? "Online" : "Offline"}</p>
                </div>
            </div>

            <button onClick={() => setSelectedUser(null)}>
                <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
            </button>
        </div>
    );
}

export default ChatHeader