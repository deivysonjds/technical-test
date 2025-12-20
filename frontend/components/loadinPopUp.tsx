

export default function LoadingPopUp() {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold">Carregando...</h2>
            </div>
        </div>
    )
}