import z from "zod"
import { enterpriseSummary } from "./enterprise"


export interface supplierPf {
    id: number,
    name: string,
    email: string,
    cep: string,
    cpf: string,
    rg: string,
    birthDate: Date,
    enterprises: enterpriseSummary[]
}

export interface supplierPj {
    id: number,
    name: string,
    email: string,
    cep: string,
    cnpj: string,
    enterprises: enterpriseSummary[]
}

export interface supplierPfSummary {
    id: number,
    name: string,
    email: string,
    cep: string,
    cpf: string,
    rg: string,
    birthDate: Date
}

export interface supplierPjSummary {
    id: number,
    name: string,
    email: string,
    cep: string,
    cnpj: string,
}

export const supplierPfSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório"),

    cep: z
        .string()
        .regex(/^\d{8}$/, "CEP inválido"),

    cpf: z
        .string()
        .regex(
            /^\d{11}$/,
            "CPF inválido"
        ),
    email: z
        .email({ error: "E-mail inválido" }),
    rg: z
        .string()
        .regex(
            /^\d{7,9}$/,
            "RG inválido"
        ),
    birthDate: z
        .date({ error: "Data inválida" })
})

export const supplierPjSchema = z.object({
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
    email: z
        .email({ error: "E-mail inválido" }),
})

export type supplierPfFormData = z.infer<typeof supplierPfSchema>
export type supplierPjFormData = z.infer<typeof supplierPjSchema>