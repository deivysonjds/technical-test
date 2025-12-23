import api from "./api";
import { Page } from "@/types/page";
import { 
    supplierPf, 
    supplierPfFormData, 
    supplierPfSummary, 
    supplierPj, 
    supplierPjFormData, 
    supplierPjSummary 
} from "@/types/supplier";

const supplierService = {
    getAll: async (): Promise<Page<supplierPf | supplierPj>>=>{
        let response = await api.get<Page<supplierPf | supplierPj>>('/suppliers/')
        return response.data
    },
    findById: async(id: number): Promise<supplierPf | supplierPj> => {
        let response = await api.get<supplierPf | supplierPj>(`/suppliers/${id}`)

        return response.data
    },

    insertPf: async(supplierPf: supplierPfFormData): Promise<supplierPfSummary>=>{
        const {type, ...payload}= supplierPf
        let response = await api.post<supplierPfSummary>('/suppliers/pf',payload)
        
        return response.data
    },
    insertPj: async(supplierPj: supplierPjFormData): Promise<supplierPjSummary>=>{
        const {type, ...payload}= supplierPj
        let response = await api.post<supplierPjSummary>('/suppliers/pj',payload)
        
        return response.data
    },
    
    delete: async(id: number): Promise<void> =>{
        await api.delete(`/suppliers/${id}`)
        return
    },
    updatePf: async(id: number, supplierPf: supplierPfFormData): Promise<supplierPf> =>{
        const {type, ...payload}= supplierPf
        
        let response = await api.put<supplierPf>(`/suppliers/pf/${id}`, payload)
        return response.data
    },
    updatePj: async(id: number, supplierPj: supplierPjFormData): Promise<supplierPj> =>{
        const {type, ...payload}= supplierPj
        
        let response = await api.put<supplierPj>(`/suppliers/pj/${id}`, payload)
        return response.data
    }
}

export default supplierService;