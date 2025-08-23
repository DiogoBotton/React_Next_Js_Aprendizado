import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex justify-center flex-col items-center h-screen">
            <h1 className="text-5xl">Página não encontrada</h1>
            <p className="text-2xl mt-9">Essa página que tentou acessar não existe.</p>

            <Link className="mt-9" href='/'>
                Voltar para home
            </Link>
        </div>
    )
}