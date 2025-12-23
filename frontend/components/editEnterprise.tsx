import associationService from "@/services/associationService"
import enterpriseService from "@/services/enterpriseService"
import supplierService from "@/services/supplierService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { useSuppliersStore } from "@/store/supplierStore"
import { EnterpriseFormData, enterpriseSchema } from "@/types/enterprise"
import { supplierPf, supplierPj } from "@/types/supplier"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface props {
    setEditPopUp: (state: boolean) => void
}

export default function EditEnterprise({ setEditPopUp }: props) {
    const [isChanged, setIsChanged] = useState(false)
    const [isAssociationActive, setIsAssociationActive] = useState(false)
    const { selectedEnterprise, setSelectedEnterprise } = useEnterprisesStore()
    const {setAllSuppliers, suppliers, } = useSuppliersStore()
    const [suppliersFiltered, setSuppliersFiltered] = useState<Array<supplierPf | supplierPj>>([])

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

    async function onDeleteAssociation(supplierId: number){
        try {
            await associationService.delete({enterpriseId: selectedEnterprise?.id as number, supplierId: supplierId})

        }catch (error: any){
            alert("Erro de associação: " + error.response.data.message)
        }
        let responseEnterprise = await enterpriseService.findById(selectedEnterprise?.id as number)
        setSelectedEnterprise(responseEnterprise)
        let response = await supplierService.getAll()
        setAllSuppliers(response.content)
    }

    async function onAddAssociation(supplierId: number){
        try{
            await associationService.associate({enterpriseId: selectedEnterprise?.id as number, supplierId: supplierId})
        } catch (error: any){
            alert("Erro de associação: " + error.response.data.message)
        }

        let responseEnterprise = await enterpriseService.findById(selectedEnterprise?.id as number)
        setSelectedEnterprise(responseEnterprise)
        let response = await supplierService.getAll()
        setAllSuppliers(response.content)
    }

    async function onEditSubmit(enterprise: EnterpriseFormData) {
        let response = await enterpriseService.update(selectedEnterprise?.id as number, enterprise)
        console.log(response);

        setSelectedEnterprise(response)
        onChanged()
    }

    function filterSuppliers(){
        let idsSuppliers = new Set(
            selectedEnterprise?.suppliers.map(supplier => supplier.id)
        )

        let suppliersAfterFilter: Array<supplierPf | supplierPj> = suppliers.filter(
            supplier => !idsSuppliers.has(supplier.id)
        )
        
        setSuppliersFiltered(suppliersAfterFilter)
    }

    function onChanged() {
        setIsChanged(true)

        // esconde após 3 segundos
        setTimeout(() => {
            setIsChanged(false)
        }, 3000)
    }

    useEffect(()=>{
        async function suppliersAwait(){
            let response = await supplierService.getAll()
            setAllSuppliers(response.content)
            filterSuppliers()
        }

        suppliersAwait()
        
    },[isAssociationActive, selectedEnterprise])
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
                                    <th className="px-4 py-2 text-left"></th>
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
                                    <th className="px-4 py-2 text-left"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    suppliersFiltered.length > 0 ?
                                        (suppliersFiltered.map((supplier, index) => (
                                            <tr className={index % 2 == 0 ? '' : 'bg-gray-100'} key={supplier.id}>
                                                <td className="px-4 py-2">{supplier.name}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? supplier.cpf : supplier.cnpj}</td>
                                                <td className="px-4 py-2">{supplier.email}</td>
                                                <td className="px-4 py-2">{supplier.cep}</td>
                                                <td className="px-4 py-2">{'cpf' in supplier ? 'PF' : 'PJ'}</td>
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