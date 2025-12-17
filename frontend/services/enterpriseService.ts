import { enterpriseRequest, enterpriseResponse } from "@/types/enterprise";
import api from "./api";

const enterpriseService = {
    getAll: async (): Promise<enterpriseResponse[]>=>{
        let response = await api.get<enterpriseResponse[]>('/enterprises/')
        return response.data
    },

    insert: async(enterprise: enterpriseRequest): Promise<enterpriseResponse>=>{
        let response = await api.post('/enterprises/', {enterprise})
        return response.data
    }
}

export default enterpriseService;