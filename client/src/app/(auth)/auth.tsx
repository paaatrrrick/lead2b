'use client'
import React, { useState } from 'react';
import constants from '@/helpers/constants';
import { SignUpWithGooglePopUp, LogInWithEmail } from '@/helpers/firebase';

interface AuthProps {
    isLogin: boolean;
}

const Auth = ({isLogin}: AuthProps) => {
    const screen = isLogin ? 'Log in' : 'Sign up';
    const switchAuthScreen = !isLogin ? 'I have an account' : "I don't have an acccount";
    const hrefLink = !isLogin ? '/login' : '/signup';
    const [email, setEmail] = useState<string>('');
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');


    const capitalizeFirstLetter = (string: string): string => {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const SignUpWithEmail = async () => {
        const response = await fetch(`${constants.serverUrl}${constants.endpoints.emailSignUp}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });
        if (response.ok) {
            LogInWithEmail(setError, email, password)
        } else {
            const data = await response.json();
            const errorMessage = data?.message || 'Error signing up';
            setError(errorMessage);
        }
    }

    const handleSignup = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '' || password === '' || (!isLogin && name === '')) {
            setError('Please fill out all fields.');
        } else if (!emailRegex.test(email)) {
            setError('Please enter a valid email.');
        } else if (password.length < 6) {
            setError('Password must be at least 6 characters.');
        } else if (isLogin) {
            LogInWithEmail(setError, email, password);
        } else {
            SignUpWithEmail();
        }
    }

    return (
        <div className="flex flex-col items-center justify-between h-screen w-screen bg-[#08050F]">
        <div className="bg-[#2c2c2c] rounded-lg shadow-md max-w-md min-w-[320px] p-8 w-full mt-24">
            <div className="flex flex-row items-center justify-between w-full mb-4">
                <h1 className="text-2xl font-medium text-white">{screen}</h1>
                <a href={hrefLink} className="font-normal text-sm text-primary3 text-white underline">{switchAuthScreen}</a>
            </div>
            {/* <form 
                className="flex flex-col items-center justify-between w-full"
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSignup();
                }}
                >
                <input
                    type="email"
                    id="email"
                    placeholder='Email'
                    className="w-full border border-gray-500 rounded-md focus:border-brandColor focus:ring-0 flex h-12 px-3 text-base leading-6 outline-none font-normal mt-4"
                    value={email}
                    onClick={() => setShowPassword(true)}
                    onChange={(event) => setEmail(event.target.value)}
                />
                    <input
                    type="password"
                    id="password"
                    placeholder='Password'
                    className="w-full border border-gray-500 focus:border-brandColor focus:ring-0 rounded-md flex h-12 px-3 text-base leading-6 outline-none font-normal mt-4"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                {!isLogin && (
                    <input
                    type="text"
                    id="name"
                    placeholder='Name'
                    className="w-full border border-gray-500 rounded-md focus:border-brandColor focus:ring-0 flex h-12 px-3 text-base leading-6 outline-none font-normal mt-4"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    />
                )}
                {error !== '' && <p className='text-red-600 text-sm font-light mt-2 mb-1'>{error}</p>}
                <button 
                    type="submit"
                    className='w-full mt-4 font-normal text-md h-12 bg-brandColor text-white rounded-md'
                >
                    {capitalizeFirstLetter(screen)}
                </button>
                </form> */}


            <button className="border border-gray-500 rounded-md h-12 px-3 w-full flex items-center justify-start text-gray-500 bg-white text-base font-light mt-4 hover:bg-blue-100 cursor-pointer" onClick={() => {SignUpWithGooglePopUp(setError, isLogin)}}>
                {/* Google icon here */}
                <img className='mr-4' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4="/>
                {capitalizeFirstLetter(screen)} with Google
            </button>
            <p className='font-light mt-4 text-sm text-gray-200'>
                This site is protected by reCAPTCHA and the Google <span><a href='https://policies.google.com/privacy' target="_blank" className='text-gray-300 underline'>Privacy Policy</a></span> and <span><a href='https://policies.google.com/privacy' target="_blank" className='text-gray-300 underline'>Terms of Service apply</a></span>.
            </p>
        </div>
        <div className="custom-shape-divider-bottom-1674142871">
            <svg id='authSvg' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-brandColor"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-brandColor"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-brandColor"></path>
            </svg>
        </div>
    </div>
    )
}

//{error && <p>{error.message}</p>}
export default Auth;