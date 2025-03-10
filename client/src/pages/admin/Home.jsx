import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineModeEditOutline, MdOutlineDelete } from 'react-icons/md'
import { useSelector } from 'react-redux';
import axios from '../../axios';
import { getUsers } from '../../reduxStore/authSlice';
import { useDispatch } from "react-redux";


function Home() {
    const admin = useSelector(state => state.auth.admin);
    const users = useSelector(state => state.auth.allUsers);
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    console.log(users)

    useEffect(() => {
        axios.get('/api/admin/getUsers').then(response => {
            dispatch(
                getUsers({
                    users: response.data.users
                })
            );
            navigate('/admin')
        }).catch(error => {
            setError(error.response.data.error || "something went wrong");
            setShowError(true);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])


    return (
        <>
            <div className='w-full h-screen'>
                <div className='bg-slate-900 fixed top-0 left-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[1080px] h-[600px] mx-auto bg-black/75 text-white rounded-3xl'>
                        <div className='max-w-[900px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold'>Welcome {admin}</h1>
                            <div className='w-full flex flex-col py-4'>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 p-5">
                                        <div>
                                            <h1 className='text-xl font-semibold'>User Management</h1>
                                        </div>
                                        <label for="table-search" className="sr-only">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:dark:bg-gray-800 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Phone NUmber
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {

                                            }

                                            {users.map((user) => (
                                                <tr
                                                    key={user._id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                        <img
                                                            className="w-10 h-10 rounded-full"
                                                            src={user.picturePath || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                                                            alt="user avatar"
                                                        />
                                                        <div className="pl-3">
                                                            <div className="text-base font-semibold">{user.fullname}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">{user.email}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            {user.phone ? user.phone: "Not Available"}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-5">
                                                            <span>
                                                                <MdOutlineModeEditOutline className="text-white cursor-pointer hover:text-amber-600" />
                                                            </span>
                                                            <span>
                                                                <MdOutlineDelete className="text-white cursor-pointer hover:text-red-600" />
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>


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