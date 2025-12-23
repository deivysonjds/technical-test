import { association } from "@/types/association"
import api from "./api"

const associationService = {
    associate: async(association: association): Promise<association>=>{
        let response = await api.post<association>('/association/',association)
        
        return response.data
    },
    delete: async(association: association): Promise<void> =>{
        await api.delete(`/association/`, {
            data: association
        })
        return
    }
}

export default associationService;