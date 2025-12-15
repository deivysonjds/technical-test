

export interface enterpriseResponse {
    id: number,
    cnpj: string,
    cep: string,
    name: string
}

export interface enterpriseRequest {
    cnpj: string,
    cep: string,
    name: string
}