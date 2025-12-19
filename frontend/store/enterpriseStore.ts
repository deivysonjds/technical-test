import { enterprise } from "@/types/enterprise"
import { create } from "zustand"

interface EnterpriseStore {
  enterprises: enterprise[]
  setAll: (enterprises: enterprise[]) => void
}

export const useEnterprisesStore = create<EnterpriseStore>((set) => ({
  enterprises: [],

  setAll: (enterprises) =>
    set({
      enterprises:enterprises
    }),
}))
