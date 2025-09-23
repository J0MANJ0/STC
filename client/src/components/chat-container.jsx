import React, { useEffect, useRef } from 'react'
import ChatHeader from './chat-header'
import useChat from '../store/use-chat-store'
import useAuth from '../store/use-auth-store'
import NoChatHistory from './no-chat-history'
import MessageInput from './message-input'
import MessageSkeleton from './message-skeleton'

const ChatContainer = () => {
    const { selectedUser, getMessages, messages, messagesLoading, subscribeMessages, unsubscribeMessages } = useChat()
    const { user } = useAuth()

    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser._id)
        subscribeMessages()

        return unsubscribeMessages()
    }, [selectedUser, getMessages, subscribeMessages, unsubscribeMessages])

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])
    return (
        <>
            <ChatHeader />
            <div className="flex-1 px-6 overflow-y-auto py-8">
                {messages.length > 0 && !messagesLoading ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg._id}
                                className={`chat ${msg.senderId === user._id ? "chat-end" : "chat-start"}`}
                            >
                                <div
                                    className={`chat-bubble relative ${msg.senderId === user._id
                                        ? "bg-cyan-600 text-white"
                                        : "bg-slate-800 text-slate-200"
                                        }`}
                                >
                                    {msg.image && (
                                        <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                                    )}
                                    {msg.text && <p className="mt-2">{msg.text}</p>}
                                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                                        {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {/* 👇 scroll target */}
                        <div ref={messageEndRef} />
                    </div>
                ) : messagesLoading ? (
                    <MessageSkeleton />
                ) : (
                    <NoChatHistory name={selectedUser.fullName} />
                )}
            </div>

            <MessageInput />
        </>
    );
}

export default ChatContainer