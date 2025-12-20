import { enterprise, EnterpriseFormData, enterpriseSummary } from "@/types/enterprise";
import api from "./api";
import { Page } from "@/types/page";

const enterpriseService = {
    getAll: async (): Promise<Page<enterprise>>=>{
        let response = await api.get<Page<enterprise>>('/enterprises/')
        return response.data
    },
    findById: async(id: number): Promise<enterprise> => {
        let response = await api.get<enterprise>(`/enterprises/${id}`)

        return response.data
    },

    insert: async(enterprise: EnterpriseFormData): Promise<enterpriseSummary>=>{
        let response = await api.post<enterpriseSummary>('/enterprises/',enterprise)
        
        return response.data
    },

    delete: async(id: number): Promise<void> =>{
        await api.delete(`/enterprises/${id}`)
        return
    },
    update: async(id: number, enterprise: EnterpriseFormData): Promise<enterprise> =>{

        let response = await api.put<enterprise>(`/enterprises/${id}`, enterprise)
        return response.data
    }
}

export default enterpriseService;