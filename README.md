# React_Next_Js_Aprendizado
Repositório com a finalidade de estudar React com o framework Next.js.

### Como criar a aplicação:

OBS: Evitar nomes com acentos, caracteres especiais ou espaços.

```bash
    npx create-next-app@latest meu_app
```

**Vídeo de apoio:**
- [Dominando Next JS completo do zero 🔥](https://www.youtube.com/watch?v=e6FigV2fLC8

### Anotações importantes:

#### **Criação de páginas**

Por convenção (exigência) do Next.js, é necessário sempre inicializar uma página com *export default*, exemplo:

```js
export default function NomeDaPagina(){
    return(
        ...
    )
}
```

Para renderização de componentes não é necessário o "default".

#### **Rotas navegáveis**

Qualquer arquivo que fique dentro do caminho *src/app* será considerada como uma página navegável (rota). Ou seja, caso for criado uma página dentro do caminho *src/app/contatos* e dentro desta pasta houver um arquivo chamado *page.tsx* (ou page.js, caso não houver typescript configurado) esta página será navegável. Porém, **é importante que o arquivo seja nomeado como "page" para ser renderizado**.

#### **Server Components e Client Components**

No Next.Js, por padrão, sempre que for criado uma página/componente será renderizado no lado do servidor.

Caso seja necessário criar um componente/página que seja renderizado no lado do cliente, basta usar a diretiva *'use client'* no início do código:

```js
'use client'

export default function Posts(){
    ...
}
```

Quando um componente é renderizado no **lado do servidor (Server Components)** é possível, por exemplo, realizar consultas http para uma API diretamente no corpo do componente.

Com Server Components **não é possível** utilizar *Hooks* como *UseState* e *UseEffect*, pois estas funções fazem parte da renderização reativa do lado do cliente, assim como, não é possível utilizar funções de evento (event handlers). Caso for necessário utilizar interatividade, deverá ser utilizado Client Components.

Exemplo: A página será renderizada após a requisição HTTP ser completada.

```js
export default async function Posts(){
    const response = await fetch('https://dummyjson.com/posts')
    const data: ResponseProps = await response.json()

    console.log(data) // O console log aparecerá no terminal e não apenas no navegador, isso significa que está sendo renderizado no lado do servidor

    return(
        ...
    )
}
```

Caso um componente for renderizado no lado do cliente (Client Components) não terá essa possibilidade, portanto, deverá realizar consultas http através de useStates e UseEffects.

Com Client Components é possível utilizar a reatividade dos componentes como o uso do *UseState*, *UseEffect*, funções de evento como o *onClick*, etc.

Exemplo: A página é renderizada enquanto é realizado a consulta HTTP. Enquanto a requisição é realizada não é exibido as informações em tela até que a requisição seja completada, exceto os componentes que já estão renderizados.

```js
export default function Posts(){
    const [posts, setPosts] = useState<ResponseProps>([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
        .then(resp => resp.json())
        .then(data => setPosts(data))
    }, [])

    return(
        ...
    )
}
```

É possível ter uma **junção dos dois**, onde uma página renderizada pelo servidor (Server Component) possa ter componentes renderizados pelo cliente (Client Component) para ter reatividade.

**Server Actions**

Também é possível utilizar o conceito de *Server Actions*, onde dentro de uma página Server Component é possível utilizar uma função que será executada no lado do servidor e não do cliente, para isto basta passar a diretiva *'use server'*, exemplo:

```js
export default async function Posts(){
    async function handleClickButton(){
        'use server' // Diretiva
        
        // Este console log aparecerá apenas no servidor (não aparecerá no console do navegador)
        console.log("CLICOUU, função executada pelo servidor.")
    }

    return(
        <button className="m-2 p-2 bg-blue-800 text-white hover:cursor-pointer" onClick={handleClickButton}>
            Botão com função executada pelo servidor
        </button>
    )
}
```

Da mesma forma, é possível adicionar em uma página Client Component uma função que será renderizada pelo servidor com a mesma diretiva mencionada anteriormente.

#### **Rotas Dinâmicas**

Para ter rotas dinâmicas, isto é, dado uma listagem de posts é necessário uma tela para visualizar um único post disponível. Isto deveria ser feito a partir do envio de parâmetros através da URL, onde seria enviado o Id do post, isto pode ser feito adicionando uma pasta com o nome do parâmetro/variável que será enviado pela URL, exemplo:

>`app`
>> `posts`
>>> `[id]`
>>>> page.tsx

```js
export default async function DetailPost({params} : {params: Promise<{id: string}>}){
    const { id } = await params;

    return (
        <div>
            <h1>Detalhes do Post: {id}</h1>
            ...
        </div>
    )
}
```

#### **Loading UI**

Para adicionar uma tela que aparecerá enquanto a tela principal estiver sendo carregada, por exemplo, uma requisição a uma API, com o Next é possível criar um arquivo *loading.tsx* (necessário ter esse nome) na mesma pasta da página a ser renderizada (*page.tsx*), exemplo:

```js
export default function Loading(){
    return (
        <h1>
            Carregando...
        </h1>
    )
}
```

Também é possível adicionar o loading para componentes específicos e não para a página inteira, isto é, ter a página renderizada, porém em um componente específico dentro desta página que busca alguma informação dinamicamente pode-se colocar o componente *Suspense* com a propriedade *fallback* preenchida com algum componente que será exibido enquanto o componente principal (detalhe de post, por exemplo) é carregado:

```js
export default async function DetailPost({params} : {params: Promise<{id: string}>}){
    const { id } = await params;

    return (
        <div>
            <h1>
                Detalhes do Post: {id}
            </h1>

            <Suspense fallback={<h1>Carregando...</h1>}>
                <PostInfo id={id} />
            </Suspense>
        </div>
    )
}
```

#### **Cache e Revalidate**

É possível armazenar consultas de uma API a partir do Fetch utilizando parâmetros como *cache* e *revalidate*. Por padrão o cache é configurado como *no-store*, para começar a armazenar os dados no cache basta utilizar o *force-cache*, exemplo:

```js
export default function Posts(){
    const response = await fetch('https://dummyjson.com/posts', {
        cache: 'force-cache', // Utiliza o cache do Fetch para armazenar o retorno da API
        next: {
            revalidate: 60 // Revalida o cache (puxa novamente os dados da API) em 60 segundos
        }
    })
    const data: ResponseProps = await response.json()

    return (
        ...
    )
}
```

**Revalidate**

Caso uma página Server Component for criada ela será renderizada apenas uma vez e, por exemplo, caso nessa página específica haja alguma operação dinâmica acontecendo só será renderizada apenas uma vez e mesmo que o usuário atualize a tela o conteúdo não será atualizado (pois não fará a operação dinâmica novamente, uma requisição, por exemplo). Para resolver isto, basta criar uma constante chamada *revalidate* e definir o valor em segundos que a página será atualizada, isto pode ser feito da seguinte forma:

```js
// Essa propriedade fará que a página seja atualizada a cada 60 segundos, ou seja, o número randômico será diferente a cada 60 segundos.
export const revalidate = 60;

export default function Home() {
  // Caso apenas existir esse número (sem o revalidate), quando for realizado o build, essa tela só será renderizado uma única vez e o número não atualizará mesmo que a tela seja atualizada.
  const randomNumber = Math.random() * 10;

  return (
    <div>
      <h2>Número gerado: {randomNumber}</h2>
    </div>
  )
}
```

Isto funcionaria para uma página 100% renderizada pelo servidor, porém se houver algum componente Client Component renderizando o conteúdo dinâmico também funcionaria da mesma forma.

#### **Middlewares**

É possível criar um middleware para validar por exemplo, se o usuário está logado para permitir/negar ir para uma página específica. É possível adicionar um middleware criando um arquivo *middleware.ts* (não é *tsx*, pois não é um componente) dentro da pasta *src*:

```js
import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {
    const authenticated = false;

    if (request.nextUrl.pathname.startsWith('/dashboard') && !authenticated){
        return NextResponse.redirect(new URL('/', request.url)) // parâmetros: Url de redirecionamento, url base
    }
    
    return NextResponse.next()
}
```

Neste arquivo é possível realizar requisições http para validar se o usuário está logado a partir de um token JWT, por exemplo.

#### **Route Handlers (API)**

É possível criar API's completas dentro do projeto Next.js. Para isto, é necessário criar uma pasta chamada *api* dentro da *src*. Os nomes das pastas dentro da rota *api* será as url's dos endpoints, exemplo:

>`app`
>> `api`
>>> `info`
>>>> route.ts

Neste caso, o endpoint será acessado através da rota *http://localhost:3000/api/info*.

É necessário que os nomes das funções sejam nomes de métodos http (GET, POST, PUT, DELETE, PATCH, etc) com todas as letras maíusculas, exemplo:

```js
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        name: "WolFros",
        email: "wolfros@email.com"
    })
}
```