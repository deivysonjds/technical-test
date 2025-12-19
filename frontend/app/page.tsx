"use client"
import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { EnterpriseFormData, enterprise, enterpriseSchema } from "@/types/enterprise"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function Home() {
  const [isFormActive, setIsFormActive] = useState(false)
  const [enterpriseSelected, setEnterpriseSelected] = useState<enterprise | null>(null)
  const [isLoadind, setIsLoading] = useState(true)
  const [deletePopUp, setDeletePopUp] = useState(false)
  const [editPopUp, setEditPopUp] = useState(false)
  const { enterprises, setAll } = useEnterprisesStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterpriseFormData>({
    resolver: zodResolver(enterpriseSchema),
  })

  function onEdit(enterprise: enterprise) {
    setEditPopUp(true)
    setEnterpriseSelected(enterprise)
  }

  function onEditSubmit(enterprise: EnterpriseFormData) {

  }

  function onDelete(enterprise: enterprise) {
    setDeletePopUp(true)
    setEnterpriseSelected(enterprise)
  }

  async function confirDelete() {
    await enterpriseService.delete(enterpriseSelected?.id as number)
    setDeletePopUp(false)

    const enterprises = await enterpriseService.getAll()
    setAll(enterprises.content)
  }

  async function onSubmit(data: EnterpriseFormData) {

    await enterpriseService.insert(data)
    setIsFormActive(false)

    const enterprises = await enterpriseService.getAll()
    setAll(enterprises.content)
  }

  useEffect(() => {
    async function getAllAwait() {
      let enterprises = await enterpriseService.getAll()
      setAll(enterprises.content)
      setIsLoading(false)
    }

    getAllAwait()
  }, [])
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
      {isFormActive && (
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
      )}
      {editPopUp && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="flex flex-row gap-3 bg-white rounded-xl p-6 shadow-xl"
        >
          <form
            className="flex flex-col gap-3 p-6 w-[300px]"
            onSubmit={handleSubmit(onEditSubmit)}
          > 
            <h2 className="font-bold text-center">
              Empresa
            </h2>
            <label className="text-sm font-medium">Nome</label>
            <input
              {...register("name")}
              className="border px-3 py-2 rounded"
              value={enterpriseSelected?.name}
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
              value={enterpriseSelected?.cnpj}
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
              value={enterpriseSelected?.cep}
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
          </form>
          <div className="flex flex-col items-center gap-3 p-6 ">
            <h2 className="font-bold">
              Fornecedores associados
            </h2>
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
                  enterpriseSelected && enterpriseSelected?.suppliers.length > 0 ?
                    (enterpriseSelected.suppliers.map((supplier, index)=>(
                    <tr className={index%2 ==0 ? '' : 'bg-gray-100'} key={supplier.id}>
                      <td className="px-4 py-2">{supplier.name}</td>
                      <td className="px-4 py-2">{'cpf' in supplier ? supplier.cpf : supplier.cnpj}</td>
                      <td className="px-4 py-2">{supplier.email}</td>
                      <td className="px-4 py-2">{supplier.cep}</td>
                      <td className="px-4 py-2">{'cpf' in supplier ? 'PF' : 'PJ'}</td>
                    </tr>
                    )))
                    :
                    <tr>

                    </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      {deletePopUp && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col justify-start gap-4 bg-white rounded-xl p-6 shadow-xl">
          <h2 className="font-bold">Deseja deletar a empresa abaixo?</h2>
          <span>nome: {enterpriseSelected?.name}</span>
          <span>cnpj: {enterpriseSelected?.cnpj}</span>
          <span>cep: {enterpriseSelected?.cep}</span>
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
      </div>}

      {isLoadind && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold">Carregando...</h2>
        </div>
      </div>}
    </main>
  )
}