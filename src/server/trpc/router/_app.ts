import { router } from '../trpc'

import { debtRouter } from './debt'

export const appRouter = router({
  debt: debtRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
