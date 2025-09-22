import React, { useEffect } from 'react'
import useChat from '../store/use-chat-store'
import useAuth from '../store/use-auth-store'
import UserSkeleton from './user-skeleton'

const ContactList = () => {

    const { getContacts, contacts, setSelectedUser, usersLoading } = useChat()

    const { onlineUsers } = useAuth()

    useEffect(() => {
        getContacts()
    }, [getContacts])

    if (usersLoading) return <UserSkeleton />

    return (
        <>
            {contacts.map((contact) => (
                <div
                    key={contact._id}
                    className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => setSelectedUser(contact)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                            <div className="size-12 rounded-full">
                                <img src={contact.profilePic || "/avatar.png"} />
                            </div>
                        </div>
                        <h4 className="text-slate-200 font-medium">{contact.fullName}</h4>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ContactList