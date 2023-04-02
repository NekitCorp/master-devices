import { gatewayStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseError } from "../../../../lib/errors";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // GET

    if (req.method === "GET") {
        const id = req.query.id;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Wrong gateway ID." });
        }

        try {
            const result = await gatewayStore.get(id);
            return res.status(200).json(result);
        } catch (e) {
            const { message, statusCode } = parseError(e);
            return res.status(statusCode).json({ error: message });
        }
    }

    // DELETE

    if (req.method === "DELETE") {
        const id = req.query.id;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Wrong gateway ID." });
        }

        try {
            const result = await gatewayStore.delete(id);
            return res.status(200).json(result);
        } catch (e) {
            const { message, statusCode } = parseError(e);
            return res.status(statusCode).json({ error: message });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
