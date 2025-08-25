'use client'

interface ButtonProps {
    title: string;
}

export const Button: React.FC<ButtonProps> = ({title}) => {
    return(
        <button className="m-2 p-2 bg-blue-800 text-white hover:cursor-pointer"
            onClick={() => alert("Reatividade dentro de um Server Component :)")}>
            {title}
        </button>
    )
}