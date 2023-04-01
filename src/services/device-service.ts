import type { Device } from "@/stores";

class DeviceService {
    private readonly LIST_API = `/api/devices`;
    private readonly API = `/api/device`;

    public list = async ({ free }: { free?: boolean }): Promise<Device[]> => {
        const searchParams = new URLSearchParams();

        if (free) {
            searchParams.set("free", free.toString());
        }

        const res = await fetch(`${this.LIST_API}?${searchParams}`);

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

    public unlink = async (id: string): Promise<Response> => {
        return fetch(`${this.API}/unlink/${encodeURIComponent(id)}`, {
            method: "POST",
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
        });
    };

    public link = async (id: string, gateway_id: string): Promise<Response> => {
        return fetch(`${this.API}/link/${encodeURIComponent(id)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ gateway_id }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            throw new Error(res.statusText);
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

export const deviceService = new DeviceService();
