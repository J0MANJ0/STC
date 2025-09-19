import React from 'react'
import useAuth from '../store/use-auth-store'

const Chat = () => {
    const { logout, user } = useAuth()
    return (
        <div className='flex justify-center items-center z-10 gap-2'>
            <span className='font-bold'>{user.fullName}-{user._id}</span>
            <button onClick={logout} className='btn btn-primary'>Logout</button>
        </div>
    )
}

export default Chat