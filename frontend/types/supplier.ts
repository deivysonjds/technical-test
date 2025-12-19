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