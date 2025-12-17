import { EnterpriseFormData, enterpriseResponse } from "@/types/enterprise";
import api from "./api";
import { Page } from "@/types/page";

const enterpriseService = {
    getAll: async (): Promise<Page<enterpriseResponse>>=>{
        let response = await api.get<Page<enterpriseResponse>>('/enterprises/')
        return response.data
    },

    insert: async(enterprise: EnterpriseFormData): Promise<enterpriseResponse>=>{
        let response = await api.post('/enterprises/',enterprise)
        
        return response.data
    }
}

export default enterpriseService;