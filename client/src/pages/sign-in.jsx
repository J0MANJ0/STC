import React, { useState } from 'react'
import { Link } from 'react-router'
import useAuth from '../store/use-auth-store'
import AnimatedBorderContainer from '../components/animated-border-container'
import { LockIcon, MailIcon, MessageCircleIcon, LoaderIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const SignIn = () => {
    const { login, isLoggingIn } = useAuth()

    const [formData, setFormData] = useState({ email: '', password: '' })

    const handleSubmit = e => {
        e.preventDefault()
        login(formData)
    }

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}

            className="w-full flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
                <AnimatedBorderContainer>
                    <div className="w-full flex flex-col md:flex-row">
                        {/* FORM CLOUMN - LEFT SIDE */}
                        <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
                            <div className="w-full max-w-md">
                                {/* HEADING TEXT */}
                                <div className="text-center mb-8">
                                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                                    <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                                    <p className="text-slate-400">Login to access to your account</p>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* EMAIL INPUT */}
                                    <div>
                                        <label className="auth-input-label">Email</label>
                                        <div className="relative">
                                            <MailIcon className="auth-input-icon" />

                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input"
                                                placeholder="johndoe@gmail.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* PASSWORD INPUT */}
                                    <div>
                                        <label className="auth-input-label">Password</label>
                                        <div className="relative">
                                            <LockIcon className="auth-input-icon" />

                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="input"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* SUBMIT BUTTON */}
                                    <button className="auth-btn flex justify-center items-center" type="submit" disabled={isLoggingIn}>
                                        {isLoggingIn ? (
                                            <LoaderIcon className="size-7 animate-spin text-center" />
                                        ) : (
                                            "Sign In"
                                        )}
                                    </button>
                                </form>

                                <div className="mt-6 text-center">
                                    <Link to="/sign-up" className="auth-link">
                                        Don't have an account? Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* FORM ILLUSTRATION - RIGHT SIDE */}
                        <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
                            <div>
                                <img
                                    src="/login.png"
                                    alt="People using mobile devices"
                                    className="w-full h-auto object-contain"
                                />
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>

                                    <div className="mt-4 flex justify-center gap-4">
                                        <span className="auth-badge">Free</span>
                                        <span className="auth-badge">Easy Setup</span>
                                        <span className="auth-badge">Private</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedBorderContainer >
            </div>
        </motion.div>
    )
}

export default SignIn