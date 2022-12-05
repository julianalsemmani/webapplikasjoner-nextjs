import { NextApiRequest, NextApiResponse } from 'next';
import * as overwritesController from '../../../features/overwrites/overwrites.controller';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    switch (req.method?.toLowerCase()) {
        case 'get':
            const { id } = req.query;
            const overwrite = await overwritesController.getOverwrite(id);
            return res.status(200).json(overwrite);
        case 'post':
            const { id: Id, ...data } = req.body;
            const updatedOverwrite = await overwritesController.postOverwrite(Id, data);
            return res.status(200).json(updatedOverwrite);
        default:
            return res.status(400).json({ message: 'Invalid request method' });
    }
}