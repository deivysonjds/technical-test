

export default function Nav(){

    return (
        <>
            <nav className="flex flex-row justify-end items-center gap-10 pr-15 h-15 shadow">
                <a className="text-lg hover:scale-105 hover:text-blue-400 font-bold" href="/">Empresas</a>
                <a className="text-lg hover:scale-105 hover:text-blue-400 font-bold" href="/fornecedores">Fornecedores</a>
            </nav>
        </>
    )
}