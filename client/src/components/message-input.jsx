import React, { useRef, useState } from 'react'
import useKeyboardSound from '../hooks/use-keyboard-sound'
import useChat from '../store/use-chat-store'
import { ImageIcon, SendIcon, XIcon } from 'lucide-react'

const MessageInput = () => {
    const { randomStrokeSound } = useKeyboardSound()
    const [text, setText] = useState('')
    const [imgPreview, setImgPreview] = useState(null)

    const fileRef = useRef(null)

    const { sendMessage, soundEnabled } = useChat();

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!text.trim() && !imgPreview) return;
        if (soundEnabled) randomStrokeSound();

        sendMessage({
            text: text.trim(),
            image: imgPreview,
        });
        setText("");
        setImgPreview("");
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => setImgPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImgPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    return (
        <div className="p-4 border-t border-slate-700/50">
            {imgPreview && (
                <div className="max-w-3xl mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imgPreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        soundEnabled && randomStrokeSound();
                    }}
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
                    placeholder="Type your message..."
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    onChange={handleImageChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${imgPreview ? "text-cyan-500" : ""
                        }`}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>
                <button
                    type="submit"
                    disabled={!text.trim() && !imgPreview}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}

export default MessageInput