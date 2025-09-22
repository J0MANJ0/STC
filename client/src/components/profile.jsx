import React, { useRef, useState } from 'react'
import useAuth from '../store/use-auth-store'
import useChat from '../store/use-chat-store'
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
    const { logout, user, updateProfile } = useAuth()
    const { soundEnabled, toggleSound } = useChat()

    const [img, setImg] = useState(null)

    const fileRef = useRef(null)

    const handleImageUpload = e => {
        const file = e.target.files[0]

        if (!file) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = async () => {
            const base64Img = reader.result
            setImg(base64Img)
            await updateProfile({ profilePic: base64Img })
        }
    }
    return (
        <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* AVATAR */}
                    <div className="avatar online">
                        <button
                            className="size-14 rounded-full overflow-hidden relative group"
                            onClick={() => fileRef.current.click()}
                        >
                            <img
                                src={img || user.profilePic || "/avatar.png"}
                                alt="User image"
                                className="size-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-xs">Change</span>
                            </div>
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            ref={fileRef}
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </div>

                    {/* USERNAME & ONLINE TEXT */}
                    <div>
                        <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
                            {user.fullName}
                        </h3>

                        <p className="text-slate-400 text-xs">Online</p>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 items-center">
                    {/* LOGOUT BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={logout}
                    >
                        <LogOutIcon className="size-5" />
                    </button>

                    {/* SOUND TOGGLE BTN */}
                    <button
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                        onClick={() => {
                            // play click sound before toggling
                            mouseClickSound.currentTime = 0; // reset to start
                            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                            toggleSound();
                        }}
                    >
                        {soundEnabled ? (
                            <Volume2Icon className="size-5" />
                        ) : (
                            <VolumeOffIcon className="size-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeader