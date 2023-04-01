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

    public delete = async (id: string): Promise<Response> => {
        return fetch(`${this.API}/${encodeURIComponent(id)}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        });
    };
}

export const gatewayService = new GatewayService();
