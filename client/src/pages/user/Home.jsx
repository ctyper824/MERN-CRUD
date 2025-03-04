import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <div className='w-full h-screen'>
        <div className='bg-slate-900 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[540px] h-[600px] mx-auto bg-black/75 text-white rounded-3xl'>
            <div className='max-w-[420px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Home</h1>
              <div className='w-full flex flex-col py-4'>
                <div className='w-full flex justify-center'>
                  <img className='rounded-full w-32' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="user image not available" />
                </div>
                {user.fullname && (
                  <div className='flex w-full pt-10 py-5'>
                    <span className='w-[40%] flex'>Full name</span>
                    <span className='w-[15%] flex'>:</span>
                    <span className='w-[45%] flex'>{user.fullname}</span>
                  </div>
                )}
                {user.email && (
                  <div className='flex w-full py-5'>
                    <span className='w-[40%] flex'>Email</span>
                    <span className='w-[15%] flex'>:</span>
                    <span className='w-[45%] flex'>{user.email}</span>
                  </div>
                )}
                {user.phone && (
                  <div className='flex w-full py-5'>
                    <span className='w-[40%] flex'>Phone number</span>
                    <span className='w-[15%] flex'>:</span>
                    <span className='w-[45%] flex'>{user.phone}</span>
                  </div>
                )}
                <Link to='/profile'>
                  <button className='bg-amber-600 py-3 my-6 rounded font-bold w-full'>Profile</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
