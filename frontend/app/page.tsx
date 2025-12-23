"use client"
import DeletePopUp from "@/components/deteletPopUp"
import EditEnterprise from "@/components/editEnterprise"
import InsertEnterprise from "@/components/insertEnterprise"
import LoadingPopUp from "@/components/loadinPopUp"
import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { enterprise } from "@/types/enterprise"
import { useEffect, useState } from "react"

export default function Home() {
  const [isFormActive, setIsFormActive] = useState(false)
  const [isLoadind, setIsLoading] = useState(true)
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const {selectedEnterprise,setSelectedEnterprise,enterprises, setAllEnterprises } = useEnterprisesStore()

  function onEdit(enterprise: enterprise) {
    setEditPopUp(true)
    setSelectedEnterprise(enterprise)
  }

  function onDelete(enterprise: enterprise) {
    setDeletePopUp(true)
    setSelectedEnterprise(enterprise)
  }

  useEffect(() => {
    async function getAllAwait() {
      let enterprises = await enterpriseService.getAll()
      setAllEnterprises(enterprises.content)
      setIsLoading(false)
    }

    getAllAwait()
  }, [selectedEnterprise])

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col gap-5 pt-10">
        <h1 className="font-bold text-lg">
          Empresas
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
              <th className="px-4 py-2 text-left">CNPJ</th>
              <th className="px-4 py-2 text-left">CEP</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {enterprises.length > 0 ? (
              enterprises.map((enterprise, index) => (
                <tr key={enterprise.id} className={`hover:bg-gray-50 ${index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}`}>
                  <td className="px-4 py-2">{enterprise.name}</td>
                  <td className="px-4 py-2">{enterprise.cnpj}</td>
                  <td className="px-4 py-2">{enterprise.cep}</td>
                  <td className="pt-3 flex flex-row gap-10 justify-start items-center">
                    <img onClick={() => onEdit(enterprise)} className="w-6 h-6 hover:cursor-pointer" src="./edit.svg" alt="editar" />
                    <img onClick={() => onDelete(enterprise)} className="w-6 h-6 hover:cursor-pointer" src="./delete.svg" alt="excluir" />
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

      {isFormActive && <InsertEnterprise setIsFormActive={setIsFormActive}/>}
      {editPopUp && <EditEnterprise setEditPopUp={setEditPopUp}/>}
      {deletePopUp && <DeletePopUp setDeletePopUp={setDeletePopUp}/>}
      {isLoadind && <LoadingPopUp />}
    </main>
  )
}