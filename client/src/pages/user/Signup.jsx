import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axios';


function Signup() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        const stringRegex = /^[a-zA-Z0-9_.\s-]{3,}$/
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordRegex = /^[^\s]{6,}$/

        e.preventDefault();
        try {
            if (!stringRegex.test(fullname)) {
                setError("Invalid Fullname");
                setShowError(true);
                return false;
            } else if (!emailRegex.test(email)) {
                setError("Invalid Email Address");
                setShowError(true);
                return false;
            } else if (!passwordRegex.test(password)) {
                setError("Invalid Password! Make a strong password");
                setShowError(true);
                return false;
            } else if (password !== confirmPassword) {
                setError("Confirm your password");
                setShowError(true);
                return false;
            } else {
                setIsLoading(true)
                axios.post('/auth/register', {
                    fullname,
                    email,
                    password,
                }).then(response => {
                    navigate('/login')
                }).catch(error => {
                    setError(error.response.data.error);
                    setShowError(true);
                }).finally(()=> {
                    setIsLoading(false);
                })
            }
        } catch (err) {
            console.error(err);
            setShowError(true);
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            showError && setShowError(false)
        }, 3000)
        return () => clearTimeout(timer)
    }, [showError])


    return (
        <>
            <div className='w-full h-screen'>
                <div className='bg-slate-900 fixed top-0 left-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 pt-24 z-50'>
                    <div className='max-w-[450px] h-auto mx-auto bg-black/75 text-white rounded-3xl'>
                        <div className='max-w-[320px] mx-auto pt-16 pb-5'>
                            <h1 className='text-3xl font-bold'>Sign Up</h1>
                            <form onSubmit={handleSubmit} className='w-full flex flex-col py-4'>
                                <input onChange={(e) => setFullname(e.target.value)} className='p-3 my-2 dark:bg-gray-800 rounded' type="text" placeholder='Fullname' autoComplete='email' />
                                <input onChange={(e) => setEmail(e.target.value)} className='p-3 my-2 dark:bg-gray-800 rounded' type="text" placeholder='Email' autoComplete='email' />
                                <input onChange={(e) => setPassword(e.target.value)} className='p-3 my-2 dark:bg-gray-800 rounded' type="password" placeholder='Password' autoComplete='current-password' />
                                <input onChange={(e) => setConfirmPassword(e.target.value)} className='p-3 my-2 dark:bg-gray-800 rounded' type="password" placeholder='Confirm Password' autoComplete='current-password' />
                                {
                                    showError && <div className="p-4 my-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                        <span className="font-medium">{error}</span>
                                    </div>
                                }
                                {
                                    isLoading ? <button className='bg-amber-600 py-3 my-3 rounded font-bold'><svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin dark:text-g-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                                    </svg>Loading</button> : <button className='bg-amber-600 py-3 my-3 rounded font-bold'>Sign Up</button>
                                }
                                <p className='py-5'><span className='text-gray-400'>Already have an account? </span>{" "}
                                    <Link to='/login'> Log In</Link>

                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup