import { Button } from "@/components/button";
import Link from "next/link";

export interface PostProps {
    id: number;
    title: number;
    body: string;
    userId: number;
}

interface ResponseProps {
    posts: PostProps[]
}

export default async function Posts(){
    const response = await fetch('https://dummyjson.com/posts', {
        cache: 'force-cache', // Utiliza o cache do Fetch para armazenar o retorno da API
        next: {
            revalidate: 60 // Revalida o cache (puxa novamente os dados da API) em 60 segundos
        }
    })
    const data: ResponseProps = await response.json()

    console.log(data)

    async function handleFetchPosts(){
        'use server' // Diretiva para a função ser executada no lado do servidor
        
        // Este console log aparecerá apenas no servidor (não aparecerá no console do navegador)
        console.log("CLICOUU, função executada pelo servidor.")

        const response = await fetch('https://dummyjson.com/posts')
        const data: ResponseProps = await response.json()

        console.log(data)
    }

    async function handleSearchUsers(formData: FormData){
        'use server' // Diretiva para a função ser executada no lado do servidor
        
        const userId = formData.get('userId')

        const response = await fetch(`https://dummyjson.com/posts/user/${userId}`)
        const data: ResponseProps = await response.json()

        console.log(data)
    }

    return(
        <div>
            <h1 className="text-center my-5 font-bold text-3xl">Todos os Posts</h1>

            <Button title="Botão reativo" /> 

            <button className="m-2 p-2 bg-blue-800 text-white hover:cursor-pointer" onClick={handleFetchPosts}>
                Buscar Posts
            </button>

            <form 
                className=" gap-2 my-4"
                action={handleSearchUsers}
            >
                <input 
                    type="text"
                    placeholder="Id do usuário"
                    className="border border-gray-200 p-2"
                    name="userId"
                />

                <button 
                    className="bg-blue-500 text-white p-2 hover:cursor-pointer"
                    type="submit"
                >
                    Filtrar
                </button>
            </form>

            <div className="flex flex-col gap-4 mx-2">
                {data.posts.map(post => (
                    <div key={post.id} className="bg-gray-200 p-4 rounded-md">
                        <h2 className="font-bold">{post.title}</h2>
                        <p>{post.body}</p>
                        <Link 
                            href={`posts/${post.id}`}
                            className="text-blue-500">
                            Detalhes
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}