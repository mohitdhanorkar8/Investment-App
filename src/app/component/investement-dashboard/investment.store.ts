import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Investment } from "../../model/investment.model";
import { computed, inject } from "@angular/core";
import { InvestmentStoreService } from "../../service/investment-store-service";

type InvestmentStore = {
    investments: Investment[];
    isLoading: boolean;
    error: string | null;
};

export const InvestmentStore = signalStore(
    { providedIn: 'root' },

    // 1) state
    withState<InvestmentStore>({
        investments: [],
        isLoading: false,
        error: null,
    }),

    // 2) derived values
    withComputed(({ investments }) => ({
        totalInvested: computed(() =>
            investments().reduce((sum, inv) => sum + inv.amount, 0)
        ),
        totalCurrent: computed(() =>
            investments().reduce((sum, inv) => sum + inv.currentValue, 0)
        ),
        totalGain: computed(() => {
            const list = investments();
            const invested = list.reduce((sum, inv) => sum + inv.amount, 0);
            const current = list.reduce((sum, inv) => sum + inv.currentValue, 0);
            return current - invested;
        })
    })),

    // 3) methods (no observables exposed)
    withMethods((store, service = inject(InvestmentStoreService)) => ({
        async loadAll() {
            patchState(store, { isLoading: true, error: null });
            try {
                const data = await service.getAll();
                patchState(store, { investments: data, isLoading: false });
            } catch (err) {
                patchState(store, { 
                    error: (err as Error).message ?? 'Unknown error',
                    isLoading: false,
            });
            }
        }
    })),

    // 4) lifecycle: auto-load on first use
    withHooks({
        onInit: (store) => {
            store.loadAll();
        }
    })
)