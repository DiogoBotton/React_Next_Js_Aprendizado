import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request: NextRequest) {
    const authenticated = false;

    if (request.nextUrl.pathname.startsWith('/dashboard') && !authenticated){
        console.log("Você não pode acessar está página!")
        return NextResponse.redirect(new URL('/', request.url)) // parâmetros: Url de redirecionamento, url base
    }
    
    return NextResponse.next()
}