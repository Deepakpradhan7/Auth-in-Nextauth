'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { signIn, useSession } from 'next-auth/react';
import { LuLoader2 } from "react-icons/lu";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { FormDataSchema } from '@/utils/Schema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Inputs = Omit<z.infer<typeof FormDataSchema>, 'username'>
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema.omit({username: true}))
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter()
    // const session = useSession()
    const { data: session, status: sessionStatus } = useSession()
    if (sessionStatus == 'authenticated') {
        router.replace('/dashboard')
    }

    const onSubmit = async (data: any) => {
        setError("")
        setLoading(true)
        const { email, password } = data
        try {
            const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })
      

        if (res?.error == "CredentialsSignin"){
            setError("Invalid email or password");
        }
        if (res?.error == "Error: Illegal arguments: string, undefined"){
             setError('Email might be associated with Google or github')
        }
        
        if (res?.url){
            setError('')
            router.replace('/dashboard')
        }
        } catch (error) {
            setError("Try again")
            console.log(error)
        }
        finally {
            setLoading(false)
        }
        

    }

    if (sessionStatus == 'loading') {
        return (
            <div className='flex items-center justify-center w-full h-[70vh]'>
                <LuLoader2 className="w-8 h-8 mr-2 animate-spin text-fuchsia-900" />
            </div>)
    }

    return (

        sessionStatus !== 'authenticated' &&
        <div className='w-full flex justify-center'>
            <div className="bg-fuchsia-300 rounded-lg mx-1 md:mx-0 md:rounded-2xl flex max-w-3xl p-5 items-center">
                <div className="md:w-1/2 px-8">
                    <h2 className="font-bold text-3xl text-fuchsia-900">Login</h2>
                    <p className="text-sm mt-4 text-fuchsia-900">If you already a member, easily log in now.</p>

                    <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <input {...register('email')} className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" />
                        {errors.email?.message && (
                              <span className="text-red-700 text-sm">{errors.email.message}</span>
                        )}
                        <input {...register('password')} className="p-2 rounded-xl border w-full" type="password" name="password" id="password" placeholder="Password" />
                        {errors.password?.message && (
                              <span className="text-red-700 text-sm">{errors.password.message}</span>
                        )}
                        <button type='submit' className="bg-fuchsia-900 text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium flex gap-3 items-center text-center justify-center h-10" >{loading ? <LuLoader2 className="w-4 h-4 mr-2 animate-spin text-white"/>: "Login"}</button>
                        {error && <span className="text-red-700 text-sm">{error}</span>}
                    </form>
                    <div className="mt-6  items-center text-gray-100">
                        <p className="text-center text-fuchsia-800 text-sm">OR</p>
                    </div>
                    <button onClick={()=>signIn('google')} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                        <FcGoogle className='text-lg mr-2' />

                        Signin with Google
                    </button>
                    <button  onClick={()=>signIn('github')} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-[#60a8bc4f] font-medium">
                        <FaGithub className='text- mr-2' />

                        Signin with Github
                    </button>
                    <div className="mt-4 text-sm flex justify-between items-center container-mr">
                        <p className="mr-3 md:mr-0 ">If you don&apos;t have an account</p>
                        <Link href='/register'>
                        <button className="hover:border register text-white bg-fuchsia-900 hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300">Register</button>
                        </Link>
                    </div>
                </div>
                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl max-h-[1600px]" src="/authimage.jpg" alt="login form image" />
                </div>
            </div>
        </div>
    )
}

export default Login
