import { PostProps } from "../../page"

export async function PostInfo({ id }: {id: string}){
    // Simula requisição demorada para aparecer o loading
    await new Promise(resolve => setTimeout(resolve, 2000))

    const response = await fetch(`https://dummyjson.com/posts/${id}`)
    const data: PostProps = await response.json()

    console.log(data)

    return(
        <div>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
        </div>
    )
}