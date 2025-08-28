import { Metadata } from "next"

// O openGraph cria uma visualização básica sobre a página
// Como por exemplo, quando manda o link de alguma página no whatsapp exibe uma pré-visualização
export const metadata: Metadata = {
  title: 'HOME - Aula Next Js', // Será o nome da guia no navegador
  description: 'Página inicial, aprendendo Next.Js',
}

// Essa propriedade fará que a página seja atualizada a cada 60 segundos, ou seja, o número randômico será diferente a cada 60 segundos.
export const revalidate = 60;

export default function Home() {
  // Caso apenas existir esse número, quando for realizado o build, essa tela só será renderizado uma única vez e o número não atualizará mesmo que a tela seja atualizada.
  const randomNumber = Math.random() * 10;

  return (
    <div>
      <h1>HOME</h1>
      <h2>Número gerado: {randomNumber}</h2>
    </div>
  )
}