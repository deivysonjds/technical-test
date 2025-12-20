import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"

interface props {
    setDeletePopUp: (state: boolean) => void
}

export default function DeletePopUp({setDeletePopUp}: props){
    const {selectedEnterprise, setAll} = useEnterprisesStore()

    async function confirDelete() {
        await enterpriseService.delete(selectedEnterprise?.id as number)
        setDeletePopUp(false)
    
        const enterprises = await enterpriseService.getAll()
        setAll(enterprises.content)
      }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col justify-start gap-4 bg-white rounded-xl p-6 shadow-xl">
          <h2 className="font-bold">Deseja deletar a empresa abaixo?</h2>
          <span>nome: {selectedEnterprise?.name}</span>
          <span>cnpj: {selectedEnterprise?.cnpj}</span>
          <span>cep: {selectedEnterprise?.cep}</span>
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              className="h-10 flex-1 bg-green-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
              onClick={() => confirDelete()}
            >
              Confirmar
            </button>

            <button
              className="h-10 flex-1 bg-red-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
              onClick={() => setDeletePopUp(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
}