import type { Gateway } from "@/stores";

class GatewayService {
    private readonly LIST_API = `/api/gateways`;
    private readonly API = `/api/gateway`;

    public list = async (): Promise<Gateway[]> => {
        const res = await fetch(`${this.LIST_API}`);

        return await res.json();
    };

    public get = async (id: string): Promise<Gateway> => {
        const res = await fetch(`${this.API}/${id}`);

        return await res.json();
    };

    public create = async (value: unknown): Promise<Response> => {
        return await fetch(`${this.API}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
        });
    };
}

export const gatewayService = new GatewayService();
