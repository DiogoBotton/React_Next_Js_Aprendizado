'use client'

import { useState } from "react";

interface ButtonProps {
    title: string;
}

export const Button: React.FC<ButtonProps> = ({title}) => {
    const [contador, setContador] = useState(0);

    return(
        <button className="m-2 p-2 bg-blue-800 text-white hover:cursor-pointer"
            onClick={() => {
                console.log("Reatividade dentro de um Server Component :)")
                setContador(contador+1)
                }}>
            {title} contador: {contador}
        </button>
    )
}