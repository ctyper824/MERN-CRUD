import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setLogout } from '../reduxStore/authSlice';

const Navbar = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(
      setLogout()
      )
      navigate('/');
  }

  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
      <Link to='/'>
        <h1 className='text-amber-600 text-3xl font-bold cursor-pointer'>CRUD APP</h1>
      </Link>
      <div>
        {
          token ? <button onClick={handleLogout} className='bg-amber-600 text-white px-6 py-2 rounded cursor-pointer'>Logout</button> : <div>
            <Link to='/login'>
              <button className='text-amber-600 pr-4'>Sign In</button>
            </Link>
            <Link to='/signup'>
              <button className='bg-amber-600 text-white px-6 py-2 rounded cursor-pointer'>Sign Up</button>
            </Link>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar