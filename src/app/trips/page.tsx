import React, {Suspense} from 'react';
import {auth} from "@/auth";
import Link from "next/link";

async function TripsContent() {
    const session = await auth();
    if (!session) {
        return (
            <div
                className="flex justify-center items-center gap-2 h-screen text-gray-700 text-xl sm:text-4xl font-semibold ">
                Please Sign In.
            </div>
        )
    }
    return (
        <div className="space-y-6 mx-auto px-4 py-8  container ">
            <div>
                <h1 >Dashboard</h1>
                <Link href={"/trips/new"}>
                    <button className="flex items-center justify-center text-white cursr-pointer gap-2.5 ml-0.5 rounded-md py-2 px-3 bg-gray-800 hover:bg-linear-to-bl from-gray-950/90 via-slate-600/10 to-slate-700 hover:shadow-sm cursor-pointer ">New Trip</button>
                </Link>

            </div>
        </div>
    );
}

export default function TripsPage() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <TripsContent/>
        </Suspense>
    );
}