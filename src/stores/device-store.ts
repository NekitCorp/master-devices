import { CreateCollectionOptions, ObjectId } from "mongodb";
import { Store } from "./store";

export type DeviceSchema = {
    uid: number;
    vendor: string;
    created: Date;
    status: "online" | "offline";
    gateway_id: ObjectId;
};

export type Device = DeviceSchema;

class DeviceStore extends Store<DeviceSchema> {
    public get collectionName(): string {
        return "gateways";
    }

    public async getList() {
        const collection = await this.collection;
        return await collection.find({}).toArray();
    }

    public get schema(): CreateCollectionOptions {
        return {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    title: "Device Object Validation",
                    required: ["uid", "vendor", "created", "status", "gateway_id"],
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
