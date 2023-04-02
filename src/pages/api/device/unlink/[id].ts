import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "../../../../../lib/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const id = req.query.id;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Wrong device ID." });
        }

        try {
            const result = await deviceStore.unlink(id);
            return res.status(200).json(result);
        } catch (e) {
            const { message, statusCode } = parseError(e);
            return res.status(statusCode).json({ error: message });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
