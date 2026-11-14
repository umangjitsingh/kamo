"use client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {createTrip} from "@/lib/server-actions/create-trip";
import {UploadButton} from "@/lib/uploadthing";
import {useState} from "react";
import Image from "next/image";

const tripSchema = z
    .object({
        title: z.string().trim().min(1, "Title is required").max(100, "Max 100 characters"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().min(1, "End date is required"),
        description: z.string().trim().max(1000, "Max 1000 characters"),
        imageUrl: z.string().optional(),
    })
    .refine((d) => !d.startDate || !d.endDate || d.endDate >= d.startDate, {
        message: "End date must be on or after start date",
        path: ["endDate"], // attaches the error to the endDate field
    });

type TripForm = z.infer<typeof tripSchema>;

export default function NewTripsPage() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<TripForm>({
        resolver: zodResolver(tripSchema),
        defaultValues: {title: "", startDate: "", endDate: "", description: ""},
    });
    const [imgUrl, setImgUrl] = useState<string | null>(null)

    async function onSubmit(data: TripForm) {
        await createTrip({...data, imageUrl: imgUrl || undefined})
    }

    return (
        <div className="p-2">
            <div className="max-w-lg mx-auto mt-10 bg-stone-50/40 rounded-lg p-4 border border-gray-400/40 shadow-sm">
                <h1 className="font-medium pt-2.5 py-6">New trip details :</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="text-sm font-medium text-gray-700/90">Title</label>
                        <input
                            id="title"
                            {...register("title")}
                            placeholder="Qatar trip..."
                            className="w-full bg-white border border-gray-400/40 px-4 py-2 rounded-md focus-within:outline-none focus:ring-1 focus:ring-teal-400"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                        <div className="w-full">
                            <label htmlFor="startDate" className="text-sm font-medium text-gray-700/90">Start
                                date</label>
                            <input
                                id="startDate"
                                type="date"
                                {...register("startDate")}
                                className="w-full bg-white border border-gray-400/40 px-4 py-2 rounded-md focus-within:outline-none focus:ring-1 focus:ring-teal-400 scheme-light text-gray-400"
                            />
                            {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="endDate" className="text-sm font-medium text-gray-700/90">End date</label>
                            <input
                                id="endDate"
                                type="date"
                                {...register("endDate")}
                                className="w-full bg-white border border-gray-400/40 px-4 py-2 rounded-md focus-within:outline-none focus:ring-1 focus:ring-teal-400 scheme-light text-gray-400"
                            />
                            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description"
                               className="text-sm font-medium text-gray-700/90">Description</label>
                        <textarea
                            id="description"
                            {...register("description")}
                            placeholder="Please enter the description of your trip."
                            className="w-full bg-white border border-gray-400/40 px-4 py-2 rounded-md focus-within:outline-none focus:ring-1 focus:ring-teal-400 min-h-60 placeholder:font-light placeholder:text-gray-400/80"
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label>Trip Image</label>
                        {imgUrl && <Image src={imgUrl} alt="Trip Preview" width={100} height={100} className="rounded-md p-4 object-cover"/>}
                    </div>
                    <div>
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res[0].ufsUrl) {
                                    setImgUrl(res[0].ufsUrl)
                                }
                            }}
                            onUploadError={(error:Error)=>{
                                console.log("Upload Error: ",error)
                            }}
                            className="ut-button:bg-teal-600 ut-button:hover:bg-teal-600 ut-button:text-white ut-button:rounded-md ut-button:px-4 ut-button:py-2 ut-button:font-medium ut-button:w-full"
                        />
                    </div>


                            <button
                            type="submit"
                            disabled={isSubmitting}
                        className="rounded-md bg-linear-to-bl cursor-pointer from-gray-950/90 to-slate-950 text-white text-center w-full py-2 font-semibold border border-gray-400/40 hover:scale-[1.007]"
                    >
                        Create Trip
                    </button>
                </form>
            </div>
        </div>
    );
}