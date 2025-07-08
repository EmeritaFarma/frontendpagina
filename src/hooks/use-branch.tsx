import { create } from "zustand";


interface BranchStore {
    branchId: number
    setBranchId: (branchId: number) => void
}


export const useBranch = create<BranchStore>((set) => ({
    branchId: 0,
    setBranchId: (branchId: number) => set({branchId}),
}))