import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const bodySchema = z.object({
    gateway_id: z.string(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const id = req.query.id;
        const parsed = bodySchema.safeParse(req.body);

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Wrong device ID." });
        }

        if (parsed.success === false) {
            return res.status(400).json({ error: parsed.error.message });
        }

        try {
            const result = await deviceStore.link(id, parsed.data.gateway_id);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                error: (e as Error).toString(),
            });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
