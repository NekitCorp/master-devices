import { serialNumberRegExp } from "@/common/validation";
import { CreateCollectionOptions, ObjectId } from "mongodb";
import { z } from "zod";
import { NotFoundError } from "../../lib/errors";
import { Device, deviceStore } from "./device-store";
import { Store } from "./store";

export type GatewaySchema = {
    serial_number: string;
    name: string;
    ip_address: string;
};

export type Gateway = GatewaySchema & {
    id: string;
    devices: Device[];
};

const gatewaySchema = z.object({
    serial_number: z.string().regex(serialNumberRegExp),
    name: z.string(),
    ip_address: z.string().ip(),
});

class GatewayStore extends Store<GatewaySchema> {
    public get collectionName(): string {
        return "gateways";
    }

    public async get(id: string): Promise<Gateway> {
        const collection = await this.collection;

        const gateway = await collection.findOne({ _id: new ObjectId(id) });

        if (gateway === null) {
            throw new NotFoundError(`Gateway with id ${id} not found.`);
        }

        const devices = await deviceStore.getList({ gateway_id: gateway._id.toString() });

        return { ...gateway, devices, id: gateway._id.toString() };
    }

    public async getList(): Promise<Gateway[]> {
        const collection = await this.collection;

        const gateway = await collection.find({}).toArray();
        const devices = await deviceStore.getList({ free: false });

        return gateway.map((g) => ({ ...g, id: g._id.toString(), devices: devices.filter((d) => d.gateway_id?.equals(g._id)) }));
    }

    public async create(value: GatewaySchema) {
        const collection = await this.collection;
        const parsed = gatewaySchema.parse(value);

        return await collection.insertOne(parsed);
    }

    public delete = async (id: string): Promise<unknown> => {
        const gatewayCollection = await this.collection;
        const deviceCollection = await deviceStore.collection;
        const gatewayId = new ObjectId(id);

        await deviceCollection.updateMany({ gateway_id: gatewayId }, { $unset: { gateway_id: "" } });

        return await gatewayCollection.deleteOne({ _id: gatewayId });
    };

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
