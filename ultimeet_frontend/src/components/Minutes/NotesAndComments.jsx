"use client";

import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from '@/api/Axios'
import styles from "../../app/minutes/minutes.module.css"
import Image from "next/image";

const NotesAndComments = () => {

    const [comments, setComments] = useState({});

    useEffect(() => {
        axiosInstance().get('recording_transcription/meeting_comments/2/').then((res) => {
            setComments(res.data)
              console.log(comments?.comments.length)
        }).catch((e) => new Error(e))
    },[])

    return (
        <>
            <div className="p-8 rounded-md shadow mt-8 ">
                <h1 className="text-primary text-xl font-semibold">
                    Notes and Comments
                </h1>
                <p className="text-grayText text-base">
                    {comments.total_count}
                </p>
                <div className={`h-96 overflow-scroll my-4 ${styles.scrollStyle}`}>

                    {
                     comments && comments?.comments && comments?.comments?.length >0 ?
                    comments?.comments.map((comment, index) => {
                        return (
                            <div
                                className="py-4 border-b border-slate-300 last:border-none pr-2"
                                key={index}
                                style={{
                                    fontFamily: "Inter",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={comment.profile_pics}
                                        alt={comment.name}
                                        width={28}
                                        height={28}
                                        className="rounded-full object-cover"
                                    />
                                    <p className="text-primary text-base font-medium">
                                        {comment.name}
                                    </p>
                                </div>
                                <p className={`mt-2 text-grayText text-base font-medium ${styles.summaryText}`}>
                                    {comment.comments}
                                </p>
                            </div>
                        );
                    }):<></>}
                </div>
            </div>

        </>
    )
}

export default NotesAndComments;