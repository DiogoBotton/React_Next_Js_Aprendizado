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