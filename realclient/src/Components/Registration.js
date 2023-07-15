import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";



const Registration = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register', {
            name: name,
            dateOfBirth: dateOfBirth,
            email: email,
            password: password
        })
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    };
    return (
        <div id='Registration'>
            <section class="bg-white">
                <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section
                        class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
                    >
                        <img
                            alt="Night"
                            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            class="absolute inset-0 h-full w-full object-cover opacity-80"
                        />

                        <div class="hidden lg:relative lg:block lg:p-12">
                        </div>
                    </section>

                    <main
                        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                    >
                        <div class="max-w-xl lg:max-w-3xl">
                            <div class="relative -mt-16 block lg:hidden">

                            </div>

                            <form action="#" class="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="FirstName"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        First Name
                                        { }
                                    </label>

                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="first_name"
                                        class="mt-1 border p-2 w-full rounded-md border-red-800 bg-white text-md text-black shadow-sm"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="DateOfBirth" className="block text-sm font-medium text-gray-700">
                                        Date of Birth
                                    </label>

                                    <DatePicker
                                        id="DateOfBirth"
                                        name="date_of_birth"
                                        className="mt-1 border p-2 w-full rounded-md border-red-800 bg-white text-md text-black shadow-sm"
                                        selected={dateOfBirth}
                                        onChange={(date) => setDateOfBirth(date)}
                                    />
                                </div>

                                <div class="col-span-6">
                                    <label for="Email" class="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        class="mt-1 border p-2  w-full rounded-md border-red-800 bg-white text-sm text-black shadow-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="Password"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        class="mt-1 p-2 border w-full rounded-md border-red-800 bg-white text-sm text-black shadow-sm"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>



                                <div class="col-span-6">
                                    <label for="MarketingAccept" class="flex gap-4">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name="marketing_accept"
                                            class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                        />

                                        <span class="text-sm text-gray-700">
                                            I want to receive emails about events, product updates and
                                            company announcements.
                                        </span>
                                    </label>
                                </div>

                                <div class="col-span-6">
                                    <p class="text-sm text-gray-500">
                                        By creating an account, you agree to our
                                        <a href="#" class="text-gray-700 underline">
                                            terms and conditions
                                        </a>
                                        and
                                        <a href="#" class="text-gray-700 underline">privacy policy</a>.
                                    </p>
                                </div>

                                <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                                    <button
                                        class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                    >
                                        Create an account
                                    </button>

                                    <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                                        Already have an account?
                                        <a href="/" class="text-gray-700 underline">Log in</a>.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </section>
        </div>
    )
}

export default Registration
