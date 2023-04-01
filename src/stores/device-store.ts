import { CreateCollectionOptions, Filter, ObjectId } from "mongodb";
import { z } from "zod";
import { Store } from "./store";

export type DeviceSchema = {
    uid: number;
    vendor: string;
    created: Date;
    status: "online" | "offline";
    gateway_id?: ObjectId;
};

export type Device = DeviceSchema & { id: string };

const deviceSchema = z.object({
    uid: z.coerce.number().min(0),
    vendor: z.string(),
    status: z.enum(["online", "offline"]),
});

class DeviceStore extends Store<DeviceSchema> {
    public get collectionName(): string {
        return "devices";
    }

    public async getList({ free, gateway_id }: { free?: boolean; gateway_id?: string }): Promise<Device[]> {
        const collection = await this.collection;
        const filter: Filter<DeviceSchema> = {};

        if (typeof free === "boolean" && !gateway_id) {
            filter.gateway_id = { $exists: !free };
        }

        if (gateway_id) {
            filter.gateway_id = { $eq: new ObjectId(gateway_id) };
        }

        return (await collection.find(filter).toArray()).map((d) => ({ ...d, id: d._id.toString() }));
    }

    public async create(value: Omit<DeviceSchema, "created" | "gateway_id">) {
        const collection = await this.collection;
        const parsed = deviceSchema.parse(value);

        return await collection.insertOne({ ...parsed, created: new Date() });
    }

    public unlink = async (id: string): Promise<unknown> => {
        const collection = await this.collection;

        return await collection.updateOne({ _id: new ObjectId(id) }, { $unset: { gateway_id: "" } });
    };

    public link = async (id: string, gateway_id: string): Promise<unknown> => {
        const collection = await this.collection;

        return await collection.updateOne({ _id: new ObjectId(id) }, { $set: { gateway_id: new ObjectId(gateway_id) } });
    };

    public delete = async (id: string): Promise<unknown> => {
        const collection = await this.collection;

        return await collection.deleteOne({ _id: new ObjectId(id) });
    };

    public get schema(): CreateCollectionOptions {
        return {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Device Object Validation",
                    required: ["uid", "vendor", "created", "status"],
                    properties: {
                        uid: {
                            bsonType: "int",
                            minimum: 0,
                            description: "'uid' must be a integer and is required",
                        },
                        vendor: {
                            bsonType: "string",
                            description: "'vendor' must be a string and is required",
                        },
                        created: {
                            bsonType: "date",
                            description: "'date' must be a ISODate and is required",
                        },
                        status: {
                            enum: ["online", "offline"],
                            description: "'status' must be online/offline",
                        },
                        gateway_id: {
                            bsonType: "objectId",
                            description: "'objectId' must be a ObjectId and is required",
                        },
                    },
                },
            },
        };
    }
}

export const deviceStore = new DeviceStore();
