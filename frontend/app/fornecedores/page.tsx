"use client"
import DeletePopUp from "@/components/deteletPopUp"
import EditSupplier from "@/components/editSupplier"
import InsertSupplier from "@/components/insertSupplier"
import LoadingPopUp from "@/components/loadinPopUp"
import supplierService from "@/services/supplierService"
import { useSuppliersStore } from "@/store/supplierStore"
import { supplierPf, supplierPj } from "@/types/supplier"
import { useEffect, useState } from "react"

export default function Home() {
    const [isFormActive, setIsFormActive] = useState(false)
    const [isLoadind, setIsLoading] = useState(true)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [editPopUp, setEditPopUp] = useState(false)
    const { selectedSupplier, setSelectedSupplier, suppliers, setAllSuppliers } = useSuppliersStore()

    function onEdit(supplier: supplierPf | supplierPj) {
        setEditPopUp(true)
        setSelectedSupplier(supplier)
    }

    function onDelete(supplier: supplierPf | supplierPj) {
        setDeletePopUp(true)
        setSelectedSupplier(supplier)
    }

    useEffect(() => {
        async function getAllAwait() {
            let suppliers = await supplierService.getAll()
            setAllSuppliers(suppliers.content)
            setIsLoading(false)
        }

        getAllAwait()
    }, [selectedSupplier])

    return (
        <main className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-5 pt-10">
                <h1 className="font-bold text-lg">
                    Fornecedores
                </h1>
                <button className="h-10 bg-green-300 rounded-lg shadow hover:cursor-pointer hover:scale-105" onClick={() => setIsFormActive(!isFormActive)}>
                    Adicionar
                </button>
            </div>
            <div className="w-full flex flex-col justiy-center items-center rounded-xl">
                <table className="m-10 w-[80%] border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-left">CNPJ / CPF</th>
                            <th className="px-4 py-2 text-left">CEP</th>
                            <th className="px-4 py-2 text-left">E-mail</th>
                            <th className="px-4 py-2 text-left">Tipo</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {suppliers.length > 0 ? (
                            suppliers.map((supplier, index) => (
                                <tr key={supplier.id} className={`hover:bg-gray-50 ${index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}`}>
                                    <td className="px-4 py-2">{supplier.name}</td>
                                    <td className="px-4 py-2">{'cpf' in supplier ? supplier.cpf : supplier.cnpj}</td>
                                    <td className="px-4 py-2">{supplier.cep}</td>
                                    <td className="px-4 py-2">{supplier.email}</td>
                                    <td className="px-4 py-2">{'cpf' in supplier ? 'PF' : 'PJ'}</td>
                                    <td className="pt-3 flex flex-row gap-10 justify-start items-center">
                                        <img onClick={() => onEdit(supplier)} className="w-6 h-6 hover:cursor-pointer" src="./edit.svg" alt="editar" />
                                        <img onClick={() => onDelete(supplier)} className="w-6 h-6 hover:cursor-pointer" src="./delete.svg" alt="excluir" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
                                    Nenhuma empresa encontrada
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>

            {isFormActive && <InsertSupplier setIsFormActive={setIsFormActive} />}
            {editPopUp && <EditSupplier setEditPopUp={setEditPopUp} />}
            {deletePopUp && <DeletePopUp setDeletePopUp={setDeletePopUp} />}
            {isLoadind && <LoadingPopUp />}
        </main>
    )
}