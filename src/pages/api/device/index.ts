import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "../../../../lib/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const result = await deviceStore.create(req.body);
            return res.status(201).json(result);
        } catch (e) {
            const { message, statusCode } = parseError(e);
            return res.status(statusCode).json({ error: message });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
