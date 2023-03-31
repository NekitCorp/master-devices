import type { Device } from "@/stores";

class DeviceService {
    private readonly LIST_API = `/api/devices`;
    private readonly API = `/api/device`;

    public list = async ({ free }: { free: boolean }): Promise<Device[]> => {
        const searchParams = new URLSearchParams();
        searchParams.set("free", free.toString());

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
}

export const deviceService = new DeviceService();
