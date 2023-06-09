import { deviceStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { parseError } from "../../../lib/errors";

const listQuerySchema = z.object({
    free: z.coerce.boolean().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const parsed = listQuerySchema.safeParse(req.query);

        if (parsed.success === false) {
            return res.status(400).json({ error: parsed.error.message });
        }

        try {
            const result = await deviceStore.getList(parsed.data);
            return res.status(200).json(result);
        } catch (e) {
            const { message, statusCode } = parseError(e);
            return res.status(statusCode).json({ error: message });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
