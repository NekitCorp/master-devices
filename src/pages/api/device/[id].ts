import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const id = req.query.id;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Wrong device ID." });
        }

        try {
            const result = await deviceStore.delete(id);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                error: (e as Error).toString(),
            });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
