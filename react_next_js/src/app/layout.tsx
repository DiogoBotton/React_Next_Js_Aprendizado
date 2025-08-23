import "./globals.css";

import { Header } from '../components/header'
import { Metadata } from "next"

// O openGraph cria uma visualização básica sobre a página
// Como por exemplo, quando manda o link de alguma página no whatsapp exibe uma pré-visualização
export const metadata: Metadata = {
  title: 'Aula Next Js', // Será o nome da guia no navegador
  description: 'Aprendendo Next.Js',
  openGraph: {
    title: 'Aprendendo Next Js :)',
    description: 'Aprendendo Next Js em casa!',
    // Foto de perfil do github :)
    images: ['https://avatars.githubusercontent.com/u/54954629?s=400&u=1f722a497e6818d5ffdbef182bcf356ca48232c6&v=4']
  }
}

// O children será a página onde será exibida este layout, neste caso, este é o layout GLOBAL
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Header />

        {children}
      </body>
    </html>
  );
}
