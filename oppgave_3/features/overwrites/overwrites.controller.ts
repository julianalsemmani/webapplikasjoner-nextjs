import { NextApiRequest, NextApiResponse } from "next";
import * as overwritesService from "./overwrites.service";

fetch("", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: 1,
        name: "test",
    })
})

export const getOverwrite = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (!id) {
        return res
            .status(400)
            .json({ status: false, error: "Id is missing" });
    }

    const overwrite = await overwritesService.getOverwrite(String(id));

    if (!overwrite?.success) {
        return res
            .status(404)
            .json({ status: false, error: "Overwrite not found" });
    }

    return res.status(200).json({ status: true, data: overwrite });
}

export const postOverwrite = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name } = req.body;

    if (!name) {
        return res
            .status(400)
            .json({ status: false, error: "Name is missing" });
    }

    const overwrite = await overwritesService.createOverwrite(name);

    if (!overwrite?.success) {
        return res
            .status(500)
            .json({ status: false, error: "Could not create overwrite" });
    }

    return res.status(200).json({ status: true, data: overwrite });
}