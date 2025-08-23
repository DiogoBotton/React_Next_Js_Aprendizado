import { Metadata } from "next"

// O openGraph cria uma visualização básica sobre a página
// Como por exemplo, quando manda o link de alguma página no whatsapp exibe uma pré-visualização
export const metadata: Metadata = {
  title: 'HOME - Aula Next Js', // Será o nome da guia no navegador
  description: 'Página inicial, aprendendo Next.Js',
}

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  )
}