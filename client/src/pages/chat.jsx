import React, { useEffect } from 'react'
import useAuth from '../store/use-auth-store'
import useChat from '../store/use-chat-store'
import AnimatedBorderContainer from '../components/animated-border-container'
import ProfileHeader from '../components/profile'
import TabsSwitch from '../components/tabs-switch'
import ChatList from '../components/chat-list'
import ContactList from '../components/contacts-list'
import NoChat from '../components/no-chat'
import ChatContainer from '../components/chat-container'

const Chat = () => {
    const { activeTab, selectedUser } = useChat()


    return (
        <div className='relative w-full max-w-6xl h-[800px]'>
            <AnimatedBorderContainer>
                <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex-col'>
                    <ProfileHeader />
                    <TabsSwitch />

                    <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                        {activeTab === 'chats' ? <ChatList /> : <ContactList />}
                    </div>
                </div>

                <div className='flex-1 flex-col bg-slate-900/50 backdrop-blur-sm'>
                    {selectedUser ? <ChatContainer /> : <NoChat />}
                </div>
            </AnimatedBorderContainer>
        </div>
    )
}

export default Chat