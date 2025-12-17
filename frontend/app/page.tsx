"use client"
import enterpriseService from "@/services/enterpriseService"
import { useEnterprisesStore } from "@/store/enterpriseStore"
import { EnterpriseFormData, enterpriseSchema } from "@/types/enterprise"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export default function Home() {
  const [isFormActive, setIsFormActive] = useState(false)
  const [isLoadind, setIsLoading] = useState(true)
  const { enterprises, setAll } = useEnterprisesStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnterpriseFormData>({
    resolver: zodResolver(enterpriseSchema),
  })

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
        <table className="m-10 w-[60%] border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">CNPJ</th>
              <th className="px-4 py-2 text-left">CEP</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {enterprises.length > 0 ? (
              enterprises.map((enterprise, index) => (
                <tr key={enterprise.id} className={`hover:bg-gray-50 ${index % 2 == 0 ? 'bg-white' : 'bg-gray-200'}`}>
                  <td className="px-4 py-2">{enterprise.name}</td>
                  <td className="px-4 py-2">{enterprise.cnpj}</td>
                  <td className="px-4 py-2">{enterprise.cep}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
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
                className="h-10 flex-1 bg-green-300 rounded-lg shadow hover:scale-105"
              >
                Confirmar
              </button>

              <button
                type="button"
                className="h-10 flex-1 bg-red-300 rounded-lg shadow hover:scale-105"
                onClick={() => setIsFormActive(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoadind && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold">Carregando...</h2>
        </div>
      </div>}
    </main>
  )
}