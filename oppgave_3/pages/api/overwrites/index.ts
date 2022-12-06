import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    switch (req.method?.toLowerCase()) {
        case 'get':
            const overwrite = await prisma.overwrites.findMany({
                include: {
                    employee: {
                        select: {
                            name: true,
                        },
                    }
                }
            });
            return res.status(200).json(overwrite);
        case 'post':
            const { id: Id, ...data } = req.body;
            const updatedOverwrite = await prisma.overwrites.update({
                where: {
                    id: Id,
                },
                data,
            });
            
            return res.status(200).json(updatedOverwrite);
        default:
            return res.status(400).json({ message: 'Invalid request method' });
    }
}