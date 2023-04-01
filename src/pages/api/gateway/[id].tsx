import { gatewayStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../../../lib/errors";

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
            if (e instanceof NotFoundError) {
                return res.status(404).json({ error: e.message });
            }

            return res.status(500).json({ error: (e as Error).toString() });
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
            return res.status(500).json({
                error: (e as Error).toString(),
            });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
