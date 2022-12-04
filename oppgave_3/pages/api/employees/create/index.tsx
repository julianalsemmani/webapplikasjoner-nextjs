import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { E } from 'vitest/dist/global-732f9b14'
import prisma from '../../../../lib/db'
import { Result } from '../../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
        try {
            const { employeeNum, name, rules } = req.body
            const employee = await prisma.emploee.create({
                data: {
                    id: randomUUID(),
                    employeeNum,
                    name,
                    rules
                },
            })
            res.status(200).json({ data: employee, status: true })
            // console.log( { employee })
        } catch (error) {
            res.status(400).json({ error: 'Not able to create', status: false })
        }
        break
    }
}
