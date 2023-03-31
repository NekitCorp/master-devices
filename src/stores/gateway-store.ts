import { CreateCollectionOptions } from "mongodb";
import { Device, deviceStore } from "./device-store";
import { Store } from "./store";

export type GatewaySchema = {
    serial_number: string;
    name: string;
    ip_address: string;
};

export type Gateway = GatewaySchema & {
    devices: Device[];
};

class GatewayStore extends Store<GatewaySchema> {
    public get collectionName(): string {
        return "devices";
    }

    public async getList(): Promise<Gateway[]> {
        const collection = await this.collection;

        const gateway = await collection.find({}).toArray();
        const devices = await deviceStore.getList();

        return gateway.map((g) => ({ ...g, devices: devices.filter((d) => d.gateway_id.equals(g._id)) }));
    }

    public get schema(): CreateCollectionOptions {
        return {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Gateway Object Validation",
                    required: ["serial_number", "name", "ip_address"],
                    properties: {
                        serial_number: {
                            bsonType: "string",
                            description: "'serial_number' must be a string and is required",
                        },
                        name: {
                            bsonType: "string",
                            description: "'name' must be a string and is required",
                        },
                        ip_address: {
                            bsonType: "string",
                            description: "'ip_address' must be a string and is required",
                        },
                    },
                },
            },
        };
    }
}

export const gatewayStore = new GatewayStore();
