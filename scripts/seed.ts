require("dotenv-flow").config();

import { deviceStore, gatewayStore } from "../src/stores";
import { client } from "../lib/mongodb";

async function run() {
    try {
        const gatewayCollection = await gatewayStore.collection;
        const devicesCollection = await deviceStore.collection;

        await gatewayCollection.deleteMany({});
        await devicesCollection.deleteMany({});

        const gateways = await gatewayCollection.insertMany([
            { serial_number: "1234", name: "name1", ip_address: "127.0.0.1" },
            { serial_number: "3454", name: "name2", ip_address: "127.0.0.2" },
        ]);

        console.log(gateways);

        const devices = await devicesCollection.insertMany([
            { uid: 1, vendor: "vendor1", created: new Date(), status: "online", gateway_id: gateways.insertedIds[0] },
            { uid: 2, vendor: "vendor1", created: new Date(), status: "offline", gateway_id: gateways.insertedIds[0] },
            { uid: 3, vendor: "vendor1", created: new Date(), status: "online", gateway_id: gateways.insertedIds[1] },
        ]);

        console.log(devices);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.log);
