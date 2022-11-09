import { z } from 'zod'

import { publicProcedure, router } from '../trpc'

export const debtRouter = router({
  getAll: publicProcedure
    .input(z.object({ date: z.date() }))
    .query(({ ctx, input }) => {
      const firstDateFromInputMonth = new Date(
        input.date.getFullYear(),
        input.date.getMonth(),
        1
      )
      const lastDateFromInputMonth = new Date(
        input.date.getFullYear(),
        input.date.getMonth() + 1,
        0
      )
      // NOTE: todas as combinações relevantes ao problema
      // firstDateFromInputMonth ... startDate ... endDate ... lastDateFromInputMonth
      // OR
      // startDate ... firstDateFromInputMonth ... lastDateFromInputMonth ... endDate
      // OR
      // startDate ... firstDateFromInputMonth ... endDate ... lastDateFromInputMonth
      // OR
      // firstDateFromInputMonth ... lastDateFromInputMonth ... startDate ... endDate
      return ctx.prisma.debt.findMany({
        where: {
          OR: [
            {
              startDate: {
                // Começa no mês
                gte: firstDateFromInputMonth,
                lte: lastDateFromInputMonth,
              },
            },
            {
              startDate: {
                // Começa no mês
                lte: firstDateFromInputMonth,
              },
              endDate: {
                // "Engloba" o mês:
                // data de final pode ser no mês selecionado
                // ou só "estar de passagem"
                gte: firstDateFromInputMonth,
              },
            },
          ],
        },
      })
    }),
})
