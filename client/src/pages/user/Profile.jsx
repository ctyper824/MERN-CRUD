import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {updateProfile} from '../../reduxStore/authSlice.js'
import axios from '../../axios';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [editFname, setEditFname] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [fullname, setFullname] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const phoneRegex = /^[5-9]\d{9}$/


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editFname && !stringRegex.test(fullname)) {
      setError("Invalid Fullname");
      setShowError(true)
    } else if (editEmail && !emailRegex.test(email)) {
      setError("Invalid Email Address");
      setShowError(true)
    } else if (editPhone && !phoneRegex.test(phone)) {
      setError("Invalid Phone Number");
      setShowError(true)
    } else {
      try {
        setIsLoading(true)
        axios.post(`/api/user/${user._id}/editProfile`, {
          fullname: editFname ? fullname : user.fullname,
          email: editEmail ? email : user.email,
          phone: editPhone ? phone : null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(response => {
          setIsLoading(false);
          setEditEmail(false);
          setEditFname(false);
          setEditPhone(false);
          setSuccess("Your information updated!")
          console.log(response.data.user);
          dispatch(
            updateProfile(response.data.user)
          );
          setShowSuccess(true)
        }).catch(error => {
          setError(error.response.data.error || "Something went wrong");
          setShowError(true);
        }).finally(() => {
          setIsLoading(false);
        })
      } catch (error) {
        setShowError(true);
        setError('Something went wrong');
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showError && setShowError(false)
      showSuccess && setShowSuccess(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [showError, showSuccess])


  return (
    <>
      <div className='w-full h-screen'>
        <div className='bg-slate-900 fixed top-0 left-0 w-full h-screen'></div>
        <div className='fixed w-full px-4 py-24 z-50'>
          <div className='max-w-[540px] h-[600px] mx-auto bg-black/75 text-white rounded-3xl'>
            <div className='max-w-[420px] mx-auto py-16'>
              <h1 className='text-3xl font-bold'>Profile</h1>
              <div className='w-full flex flex-col py-4'>
                <div className='w-full flex justify-center'>
                  <img className='rounded-full w-32' src={user?.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} alt="user image not available" />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='flex w-full pt-10 py-5'>
                    <span className='w-[40%] flex'>Full name</span>
                    <span className='w-[10%] flex'>:</span>{
                      !editFname ? <div className='w-[50%] flex justify-between'>
                        <span className=''>{user?.fullname || 'Not available'}</span>
                        <span onClick={() => setEditFname(true)}><MdOutlineModeEditOutline className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div> : <div className='w-[50%] flex justify-between'>
                        <input onChange={(e) => setFullname(e.target.value)} type="text" className="border-b border-gray-400 focus:outline-none focus:border-amber-600 bg-transparent" />
                        <span onClick={() => setEditFname(false)}><MdClose className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div>
                    }
                  </div>
                  <div className='flex w-full py-5'>
                    <span className='w-[40%] flex'>Email</span>
                    <span className='w-[10%] flex'>:</span>
                    {
                      !editEmail ? <div className='w-[50%] flex justify-between'>
                        <span className=''>{user?.email || 'Not available'}</span>
                        <span onClick={() => setEditEmail(true)}><MdOutlineModeEditOutline className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div> : <div className='w-[50%] flex justify-between'>
                        <input onChange={(e) => setEmail(e.target.value)} type="text" className="border-b border-gray-400 focus:outline-none focus:border-amber-600 bg-transparent" />
                        <span onClick={() => setEditEmail(false)}><MdClose className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div>
                    }

                  </div>
                  <div className='flex w-full py-5'>
                    <span className='w-[40%] flex'>Phone number</span>
                    <span className='w-[10%] flex'>:</span>
                    {
                      !editPhone ? <div className='w-[50%] flex justify-between'>
                        <span className=''>{user?.phone || 'Not available'}</span>
                        <span onClick={() => setEditPhone(true)}><MdOutlineModeEditOutline className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div> : <div className='w-[50%] flex justify-between'>
                        <input onChange={(e) => setPhone(e.target.value)} type="text" className="border-b border-gray-400 focus:outline-none focus:border-amber-600 bg-transparent" />
                        <span onClick={() => setEditPhone(false)}><MdClose className='text-white cursor-pointer hover:text-amber-600' /></span>
                      </div>
                    }
                  </div>
                  {
                    showError && <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                      <span className="font-medium">{error}</span>
                    </div>
                  }
                  {
                    showSuccess && <div className="p-4 my-2 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                      <span className="font-medium">{success}</span>
                    </div>
                  }
                  {
                    isLoading ? <button className='bg-amber-600 py-3 my-3 rounded font-bold w-full'><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin dark:text-g-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>Loading</button> : <div> {editFname || editEmail || editPhone ? <button className='bg-amber-600 py-3 my-3 rounded font-bold w-full'>Save Changes</button> : <button className='bg-amber-600 py-3 my-3 rounded font-bold w-full disabled:bg-gray-800 disabled:text-gray-600' disabled>Save Changes</button>}</div>
                  }
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
