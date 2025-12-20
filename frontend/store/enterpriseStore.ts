import { enterprise } from "@/types/enterprise"
import { create } from "zustand"

interface EnterpriseStore {
  enterprises: enterprise[]
  selectedEnterprise: enterprise | null
  setAll: (enterprises: enterprise[]) => void
  setSelectedEnterprise: (enterprise: enterprise) => void
}

export const useEnterprisesStore = create<EnterpriseStore>((set) => ({
  enterprises: [],
  selectedEnterprise: null,
  setAll: (enterprises) =>
    set({
      enterprises:enterprises
    }),
  setSelectedEnterprise: (enterprise) => 
    set({
      selectedEnterprise: enterprise
    })
}))
