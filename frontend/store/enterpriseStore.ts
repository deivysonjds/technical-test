import { enterpriseResponse } from "@/types/enterprise"
import { create } from "zustand"

interface EnterpriseStore {
  enterprises: enterpriseResponse[]
  setAll: (enterprises: enterpriseResponse[]) => void
}

export const useEnterprisesStore = create<EnterpriseStore>((set) => ({
  enterprises: [],

  setAll: (enterprises) =>
    set({
      enterprises,
    }),
}))
