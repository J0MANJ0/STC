import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Chat from './pages/chat'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import useAuth from './store/use-auth-store'
import PageLoader from './components/page-loader'

const App = () => {
  const { checkAuth, isCheckingAuth, user } = useAuth()

  console.log({ user, isCheckingAuth })

  useEffect(() => {
    checkAuth()
  }, [checkAuth, user])

  if (isCheckingAuth) return <PageLoader />
  return (
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />


      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App