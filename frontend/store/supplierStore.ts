import { supplierPf, supplierPj } from "@/types/supplier"
import { create } from "zustand"

interface SupplierStore {
  suppliers: Array<supplierPf | supplierPj>
  selectedSupplier: supplierPf | supplierPj | null
  setAllSuppliers: (suppliers: Array<supplierPf | supplierPj>) => void
  setSelectedSupplier: (supplier: supplierPf | supplierPj) => void
}

export const useSuppliersStore = create<SupplierStore>((set) => ({
  suppliers: [],
  selectedSupplier: null,
  setAllSuppliers: (suppliers) =>
    set({
      suppliers:suppliers
    }),
  setSelectedSupplier: (supplier) => 
    set({
      selectedSupplier: supplier
    })
}))
