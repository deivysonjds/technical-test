import { enterprise } from "@/types/enterprise"
import { create } from "zustand"

interface EnterpriseStore {
  page: number,
  totalPages: number
  enterprises: enterprise[]
  selectedEnterprise: enterprise | null
  setAllEnterprises: (enterprises: enterprise[]) => void
  setSelectedEnterprise: (enterprise: enterprise) => void
  setPage: (page: number)=> void
  setTotalPages: (totalPage: number)=> void
}

export const useEnterprisesStore = create<EnterpriseStore>((set) => ({
  page: 0,
  totalPages: 0,
  enterprises: [],
  selectedEnterprise: null,
  setAllEnterprises: (enterprises) =>
    set({
      enterprises:enterprises
    }),
  setSelectedEnterprise: (enterprise) => 
    set({
      selectedEnterprise: enterprise
    }),
  setPage: (page)=> 
    set({
      page: page
  }),
  setTotalPages: (totalPages)=> 
    set({
      totalPages: totalPages
  })
}))
