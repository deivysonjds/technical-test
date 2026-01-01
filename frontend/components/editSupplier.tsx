import associationService from "@/services/associationService"
import supplierService from "@/services/supplierService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { useSuppliersStore } from "@/store/supplierStore"
import { enterprise } from "@/types/enterprise"
import { supplierPf, supplierPfFormData, supplierPj, supplierPjFormData, supplierSchema } from "@/types/supplier"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import SupplierPFForm from "./supplierPfForm"
import SupplierPJForm from "./supplierPjForm"
import enterpriseService from "@/services/enterpriseService"

interface props {
    setEditPopUp: (state: boolean) => void
}

export default function EditSupplier({ setEditPopUp }: props) {
    const [isChanged, setIsChanged] = useState(false)
    const [isAssociationActive, setIsAssociationActive] = useState(false)
    const {selectedSupplier, setSelectedSupplier} = useSuppliersStore()
    const {setAllSuppliers } = useSuppliersStore()
    const {setAllEnterprises, enterprises} = useEnterprisesStore()
    const [enterprisesFiltered, setEnterprisesFiltered] = useState<enterprise[]>([])

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<supplierPfFormData | supplierPjFormData>({
        resolver: zodResolver(supplierSchema)
    })

    async function onDeleteAssociation(enterpriseId: number){
        try {
            await associationService.delete({enterpriseId: enterpriseId, supplierId: selectedSupplier?.id as number})

        }catch (error: any){
            alert("Erro: " + error.response.data.message)
        }
        let responseSupplier = await supplierService.findById(selectedSupplier?.id as number)
        setSelectedSupplier(responseSupplier)
        let response = await enterpriseService.getAll()
        setAllEnterprises(response.content)
    }

    async function onAddAssociation(enterpriseId: number){
        try{
            await associationService.associate({enterpriseId: enterpriseId, supplierId: selectedSupplier?.id as number})
        } catch (error: any){
            alert("Erro: " + error.response.data.message)
        }

        let responseEnterprise = await supplierService.findById(selectedSupplier?.id as number)
        setSelectedSupplier(responseEnterprise)
        let response = await enterpriseService.getAll()
        setAllEnterprises(response.content)
    }

    async function onEditSubmit(supplier: supplierPfFormData | supplierPjFormData) {
        let response: supplierPf | supplierPj
        if ('cpf' in supplier) {
            response = await supplierService.updatePf(selectedSupplier?.id as number, supplier)
        } else {
            response = await supplierService.updatePj(selectedSupplier?.id as number, supplier)
        }

        setSelectedSupplier(response)
        onChanged()
    }

    function filterEnterprises(){
        let idsEnterprises = new Set(
            selectedSupplier?.enterprises.map(enterprise => enterprise.id)
        )

        let enterprisesAfterFilter: enterprise[] = enterprises.filter(
            enterprise => !idsEnterprises.has(enterprise.id)
        )
        
        setEnterprisesFiltered(enterprisesAfterFilter)
    }

    function onChanged() {
        setIsChanged(true)

        // esconde após 3 segundos
        setTimeout(() => {
            setIsChanged(false)
        }, 3000)
    }

    useEffect(()=>{
        async function enterprisesAwait(){
            let response = await enterpriseService.getAll()
            setAllEnterprises(response.content)
            filterEnterprises()
        }

        if (!selectedSupplier) return
        const {enterprises,id, ...payload} = selectedSupplier
        let data: supplierPfFormData | supplierPjFormData
        if('cpf' in payload){
            data = {
                type: "PF",
                name: payload.name,
                cep: payload.cep,
                cpf: payload.cpf,
                email: payload.email,
                rg: payload.rg,
                birthDate: payload.birthDate,
            }

        } else {
            data = {
                type: "PJ",
                name: payload.name,
                cep: payload.cep,
                email: payload.email,
                cnpj: payload.cnpj
            }
        }
        reset(
            data
        )

        enterprisesAwait()
        
    },[isAssociationActive, selectedSupplier, reset])
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
                        Fornecedor
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

                    <label className="text-sm font-medium">E-mail</label>
                    <input
                        {...register("email")}
                        className="border px-3 py-2 rounded"
                    />
                    {errors.cep && (
                        <span className="text-red-500 text-sm">
                            {errors.cep.message}
                        </span>
                    )}

                    {
                        selectedSupplier && "cpf" in selectedSupplier ? 
                        <SupplierPFForm register={register as any} errors={errors as any}/>
                        :
                        <SupplierPJForm register={register as any} errors={errors as any}/>
                    }


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
                            Empresas associadas
                        </h3>
                        <div className="max-h-[500px] overflow-y-auto">

                        <table>
                            <thead className="bg-green-100 sticky top-0 z-10 m-0">
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        nome
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cnpj
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        cep
                                    </th>
                                    <th className="px-4 py-2 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedSupplier && selectedSupplier?.enterprises.length > 0 ?
                                        (selectedSupplier.enterprises.map((supplier, index) => (
                                            <tr className={index % 2 == 0 ? '' : 'bg-gray-100'} key={supplier.id}>
                                                <td className="px-4 py-2">{supplier.name}</td>
                                                <td className="px-4 py-2">{supplier.cnpj}</td>
                                                <td className="px-4 py-2">{supplier.cep}</td>
                                                <td onClick={()=>onDeleteAssociation(supplier.id)} className="px-4 py-2"><img className="h-6 hover:cursor-pointer hover:scale-110" src="./delete.svg" alt="deletar" /></td>
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
                            Lista de Empresas
                        </h3>
                        <div className="min-h-100 max-h-[300px] overflow-y-auto">

                            <table>
                                <thead className="bg-green-100 sticky top-0 z-10 m-0">
                                    <tr>
                                        <th className="px-4 py-2 text-left">
                                            nome
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            cnpj
                                        </th>
                                        <th className="px-4 py-2 text-left">
                                            cep
                                        </th>
                                        <th className="px-4 py-2 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        enterprisesFiltered.length > 0 ?
                                            (enterprisesFiltered.map((supplier, index) => (
                                                <tr className={index % 2 == 0 ? '' : 'bg-gray-100'} key={supplier.id}>
                                                    <td className="px-4 py-2">{supplier.name}</td>
                                                    <td className="px-4 py-2">{supplier.cnpj}</td>
                                                    <td className="px-4 py-2">{supplier.cep}</td>
                                                    <td onClick={()=>onAddAssociation(supplier.id)} className="hover:cursor-pointer hover:scale-110"><img src="./add.png" alt="adicionar" /></td>
                                                </tr>
                                            )))
                                            :
                                            <tr>
                                                <td className="text-center" colSpan={5}>
                                                    Sem fonecedores para adicionar
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
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