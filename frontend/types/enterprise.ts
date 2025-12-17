import { z } from "zod"


export interface enterpriseResponse {
    id: number,
    cnpj: string,
    cep: string,
    name: string
}
export const enterpriseSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório"),

  cep: z
    .string()
    .regex(/^\d{8}$/, "CEP inválido"),

  cnpj: z
    .string()
    .regex(
      /^\d{14}$/,
      "CNPJ inválido"
    ),
})

export type EnterpriseFormData = z.infer<typeof enterpriseSchema>
