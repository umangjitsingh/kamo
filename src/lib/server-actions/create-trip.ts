"use server";

import {auth} from "@/auth";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";


export async function createTrip(data: {title: string, description: string, startDate: string, endDate: string, imageUrl?: string}){

    const session=await auth();

    if(!session || !session.user || !session.user.id){
        throw new Error("Not logged in!");
    }

    const {title, description, startDate: startDateStr, endDate: endDateStr, imageUrl} = data;

    if( !title || !description || !startDateStr || !endDateStr ){
        throw new Error("Please enter all the required fields.");
    }

    const startDate= new Date(startDateStr);
    const endDate= new Date(endDateStr);

    await prisma.trip.create({
    data:{
        title,
        description,
        startDate,endDate,
        imageUrl,
        userId:session.user.id
    }});

    redirect("/trips")

}