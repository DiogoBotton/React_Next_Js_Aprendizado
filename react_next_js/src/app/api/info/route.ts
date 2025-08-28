import { NextResponse } from "next/server";

// Necessário que os nomes das funções sejam métodos http com todas as letras maíusculas
export async function GET() {
    return NextResponse.json({
        name: "WolFros",
        email: "wolfros@email.com"
    })
}