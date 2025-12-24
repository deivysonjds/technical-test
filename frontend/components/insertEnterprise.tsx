import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { EnterpriseFormData, enterpriseSchema } from "@/types/enterprise"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface props {
    setIsFormActive: (state: boolean) => void
}

export default function InsertEnterprise({setIsFormActive}: props) {

    const { setAllEnterprises } = useEnterprisesStore()

    async function onSubmit(data: EnterpriseFormData) {
        try {
            await enterpriseService.insert(data)
        } catch (error: any){
            alert("Erro: "+ error.response.data.message)
        }
        setIsFormActive(false)

        const enterprises = await enterpriseService.getAll()
        setAllEnterprises(enterprises.content)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnterpriseFormData>({
        resolver: zodResolver(enterpriseSchema),
    })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 bg-white rounded-xl p-6 shadow-xl w-[300px]"
            >
                <label className="text-sm font-medium">Nome</label>
                <input
                    {...register("name")}
                    className="border px-3 py-2 rounded"
                />
                {errors.name && (
                    <span className="text-red-500 text-sm">
                        {errors.name.message}
                    </span>
                )}

                <label className="text-sm font-medium">CNPJ</label>
                <input
                    {...register("cnpj")}
                    className="border px-3 py-2 rounded"
                />
                {errors.cnpj && (
                    <span className="text-red-500 text-sm">
                        {errors.cnpj.message}
                    </span>
                )}

                <label className="text-sm font-medium">CEP</label>
                <input
                    {...register("cep")}
                    className="border px-3 py-2 rounded"
                />
                {errors.cep && (
                    <span className="text-red-500 text-sm">
                        {errors.cep.message}
                    </span>
                )}

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        className="h-10 flex-1 bg-green-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
                    >
                        Confirmar
                    </button>

                    <button
                        type="button"
                        className="h-10 flex-1 bg-red-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
                        onClick={() => setIsFormActive(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}