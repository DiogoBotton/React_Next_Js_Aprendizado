# React_Next_Js_Aprendizado
Repositório com a finalidade de estudar React com o framework Next.js.

### Como criar a aplicação:

OBS: Evitar nomes com acentos, caracteres especiais ou espaços.

```bash
    npx create-next-app@latest meu_app
```

**Vídeo de apoio:**
- [Dominando Next JS completo do zero 🔥](https://www.youtube.com/watch?v=e6FigV2fLC8

#### Anotações importantes:

**Criação de páginas**

Por convenção (exigência) do Next.js, é necessário sempre inicializar uma página com *export default*, exemplo:

```js
export default function NomeDaPagina(){
    return(
        ...
    )
}
```

Para renderização de componentes não é necessário o "default".

**Rotas navegáveis**

Qualquer arquivo que fique dentro do caminho *src/app* será considerada como uma página navegável (rota). Ou seja, caso for criado uma página dentro do caminho *src/app/contatos* e dentro desta pasta houver um arquivo chamado *page.tsx* (ou page.js, caso não houver typescript configurado) esta página será navegável. Porém, **é importante que o arquivo seja nomeado como "page" para ser renderizado**.