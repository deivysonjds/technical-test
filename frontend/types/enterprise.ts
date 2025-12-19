import { z } from "zod"
import { supplierPfSummary, supplierPjSummary } from "./supplier"


export interface enterprise {
    id: number,
    cnpj: string,
    cep: string,
    name: string,
    suppliers: Array<supplierPfSummary | supplierPjSummary>
}

export interface enterpriseSummary {
    id: number,
    cnpj: string,
    cep: string,
    name: string,
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
