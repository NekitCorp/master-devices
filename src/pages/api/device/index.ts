import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const result = await deviceStore.create(req.body);
            return res.status(201).json(result);
        } catch (e) {
            if (e instanceof ZodError) {
                return res.status(400).json({ error: e.toString() });
            }

            return res.status(500).json({
                error: (e as Error).toString(),
            });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
