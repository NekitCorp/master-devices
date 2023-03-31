import { gatewayStore } from "@/stores";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const result = await gatewayStore.getList();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                error: (e as Error).toString(),
            });
        }
    }

    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
