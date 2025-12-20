import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { EnterpriseFormData, enterpriseSchema } from "@/types/enterprise"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface props {
    setEditPopUp: (state: boolean) => void
}

export default function EditEnterprise({ setEditPopUp }: props) {
    const [isChanged, setIsChanged] = useState(false)
    const [isAssociationActive, setIsAssociationActive] = useState(false)
    const { selectedEnterprise, setAll, setSelectedEnterprise } = useEnterprisesStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnterpriseFormData>({
        resolver: zodResolver(enterpriseSchema),
        defaultValues: {
            name: selectedEnterprise?.name,
            cnpj: selectedEnterprise?.cnpj,
            cep: selectedEnterprise?.cep
        }
    })

    async function onEditSubmit(enterprise: EnterpriseFormData) {
        let response = await enterpriseService.update(selectedEnterprise?.id as number, enterprise)
        console.log(response);

        setSelectedEnterprise(response)
        onChanged()
    }

    function onChanged() {
        setIsChanged(true)

        // esconde após 3 segundos
        setTimeout(() => {
            setIsChanged(false)
        }, 3000)
    }
    return (
        <div className="flex flex-col fixed inset-0 z-50 items-center justify-center bg-black/40 backdrop-blur-sm">

            <div
                className="flex flex-row gap-3 bg-white rounded-xl p-6 shadow-xl"
            >
                <form
                    className="flex flex-col gap-3 p-6 w-[300px]"
                    onSubmit={handleSubmit(onEditSubmit)}
                >
                    <h3 className="font-bold text-center">
                        Empresa
                    </h3>
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
                            Salvar
                        </button>

                        <button
                            type="button"
                            className="h-10 flex-1 bg-red-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
                            onClick={() => setEditPopUp(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                    {isChanged && <p className="text-center">
                        Dados Salvos!
                    </p>}
                </form>
                <div className="flex flex-col items-center pb-6">
                    <div className="flex flex-col items-center gap-3 p-6 ">
                        <h3 className="font-bold">
                            Fornecedores associados
                        </h3>
                        <table>
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        nome
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cnpj / cpf
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        email
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cep
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        tipo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedEnterprise && selectedEnterprise?.suppliers.length > 0 ?
                                        (selectedEnterprise.suppliers.map((supplier, index) => (
                                            <tr className={index % 2 == 0 ? '' : 'bg-gray-100'} key={supplier.id}>
                                                <td className="px-4 py-2">{supplier.name}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? supplier.cpf : supplier.cnpj}</td>
                                                <td className="px-4 py-2">{supplier.email}</td>
                                                <td className="px-4 py-2">{supplier.cep}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? 'PF' : 'PJ'}</td>
                                            </tr>
                                        )))
                                        :
                                        <tr>
                                            <td className="text-center" colSpan={5}>
                                                Sem fornecedores associados
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {!isAssociationActive && <div className="flex h-full w-full justify-end items-end gap-4 pt-2">
                        <button
                            onClick={()=>setIsAssociationActive(true)}
                            className="h-10 max-w-[50%] pr-2 pl-2 flex-1 bg-green-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
                        >Adicionar fornecedor</button>
                    </div>}
                </div>
                {isAssociationActive && <div className="flex flex-col items-center gap-3 p-6">
                    <h3 className="font-bold">
                            Lista de fornecedores
                        </h3>
                        <table>
                            <thead className="bg-green-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        nome
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cnpj / cpf
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        email
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cep
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        tipo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedEnterprise && selectedEnterprise?.suppliers.length > 0 ?
                                        (selectedEnterprise.suppliers.map((supplier, index) => (
                                            <tr className={index % 2 == 0 ? '' : 'bg-gray-100'} key={supplier.id}>
                                                <td className="px-4 py-2">{supplier.name}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? supplier.cpf : supplier.cnpj}</td>
                                                <td className="px-4 py-2">{supplier.email}</td>
                                                <td className="px-4 py-2">{supplier.cep}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? 'PF' : 'PJ'}</td>
                                            </tr>
                                        )))
                                        :
                                        <tr>
                                            <td className="text-center" colSpan={5}>
                                                Sem fonecedores cadastrados
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                        <div className="flex h-full w-full justify-end items-end gap-4 pt-2">
                        <button
                            onClick={()=>setIsAssociationActive(false)}
                            className="h-10 max-w-[50%] pr-2 pl-2 flex-1 bg-red-300 rounded-lg hover:cursor-pointer shadow hover:scale-105"
                        >Fechar</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}