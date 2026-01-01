import { supplierPf, supplierPj } from "@/types/supplier"
import { create } from "zustand"

interface SupplierStore {
  page: number,
  totalPages: number
  suppliers: Array<supplierPf | supplierPj>
  selectedSupplier: supplierPf | supplierPj | null
  setAllSuppliers: (suppliers: Array<supplierPf | supplierPj>) => void
  setSelectedSupplier: (supplier: supplierPf | supplierPj) => void
  setPage: (page: number) => void
  setTotalPages: (totalPage: number) => void
}

export const useSuppliersStore = create<SupplierStore>((set) => ({
  page: 0,
  totalPages: 0,
  suppliers: [],
  selectedSupplier: null,
  setAllSuppliers: (suppliers) =>
    set({
      suppliers: suppliers
    }),
  setSelectedSupplier: (supplier) =>
    set({
      selectedSupplier: supplier
    }),
  setPage: (page) =>
    set({
      page: page
    }),
  setTotalPages: (totalPages) =>
    set({
      totalPages: totalPages
    })
}))
