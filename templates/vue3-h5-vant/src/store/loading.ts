import { defineStore } from "pinia"

export const useLoadingStore = defineStore({
    id: 'loading',
    state: () => {
        return {
            loading: false
        }
    },
    getters: {
        getLoading(): boolean {
            return this.loading;
        },
    },
    actions: {
        setLoading(data) {
            this.loading = data
        }
    }
})