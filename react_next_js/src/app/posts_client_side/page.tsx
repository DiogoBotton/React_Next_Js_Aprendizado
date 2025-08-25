'use client'

import { useEffect, useState } from "react";

interface PostProps {
    id: number;
    title: number;
    body: string;
    userId: number;
}

interface ResponseProps {
    posts: PostProps[]
}

export default function Posts(){
    const [posts, setPosts] = useState<ResponseProps>()

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
        .then(resp => resp.json())
        .then(data => setPosts(data))
    }, [])

    return(
        <div>
            <h1 className="text-center my-5 font-bold text-3xl">Todos os Posts</h1>

            <div className="flex flex-col gap-4 mx-2">
                {posts?.posts.map(post => ( 
                    <div key={post.id} className="bg-gray-200 p-4 rounded-md">
                        <h2 className="font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}