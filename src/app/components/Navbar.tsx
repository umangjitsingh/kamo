"use client"
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {login, logout} from "@/lib/auth-actions";
import {Session} from "next-auth";

function Navbar({ session }: { session: Session | null }) {
    return (
        <nav className="bg-white shadow-sm py-0.5 border-b border-gray-200 heading">
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-6">
                <Link href={"/"} className="flex items-center">
                    <Image src={"/kamo-logo-transparent.svg"} alt="logo" width={20} height={20} loading="eager" className="w-48 h-20 sm:w-70 sm:h-24" />
                </Link>

                <div className="flex items-center space-x-4">
                    {session ? (<>
                            <Link href={"/trips"} className=" text-slate-900 hover:text-teal-600 tracking-tight text-sm sm:text-lg" >My Trips</Link>
                            <Link href={"/globe"} className="text-slate-900 hover:text-teal-600 tracking-tight text-sm sm:text-lg" >Globe</Link>


                            <button
                                onClick={logout}
                                className="flex items-center justify-center text-sm sm:text-lg text-white cursr-pointer gap-2.5 ml-0.5 rounded-md py-1.5 px-2 sm:py-2  sm:px-3  bg-gray-800 hover:bg-linear-to-bl from-gray-950/90 via-slate-600/10 to-slate-700 hover:shadow-sm cursor-pointer ">Logout

                            </button>
                        </>
                    ):(
                        <>

                            <button
                                onClick={login}
                                className="flex items-center justify-center text-sm sm:text-lg text-white cursr-pointer gap-2.5 ml-0.5 rounded-md py-1.5 px-2 sm:py-2  sm:px-3 bg-gray-800 hover:bg-linear-to-bl from-gray-950/90 via-slate-600/10 to-slate-700 hover:shadow-sm cursor-pointer">Sign In
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
                                    <path d="M0 0h32v32H0z" fill="none" />
                                    <path fill="currentColor" d="M16 .396c-8.839 0-16 7.167-16 16c0 7.073 4.584 13.068 10.937 15.183c.803.151 1.093-.344 1.093-.772c0-.38-.009-1.385-.015-2.719c-4.453.964-5.391-2.151-5.391-2.151c-.729-1.844-1.781-2.339-1.781-2.339c-1.448-.989.115-.968.115-.968c1.604.109 2.448 1.645 2.448 1.645c1.427 2.448 3.744 1.74 4.661 1.328c.14-1.031.557-1.74 1.011-2.135c-3.552-.401-7.287-1.776-7.287-7.907c0-1.751.62-3.177 1.645-4.297c-.177-.401-.719-2.031.141-4.235c0 0 1.339-.427 4.4 1.641a15.4 15.4 0 0 1 4-.541c1.36.009 2.719.187 4 .541c3.043-2.068 4.381-1.641 4.381-1.641c.859 2.204.317 3.833.161 4.235c1.015 1.12 1.635 2.547 1.635 4.297c0 6.145-3.74 7.5-7.296 7.891c.556.479 1.077 1.464 1.077 2.959c0 2.14-.02 3.864-.02 4.385c0 .416.28.916 1.104.755c6.4-2.093 10.979-8.093 10.979-15.156c0-8.833-7.161-16-16-16z" />
                                </svg>
                            </button>
                        </>
              )}


                </div>
            </div>
        </nav>
    );
}

export default Navbar;