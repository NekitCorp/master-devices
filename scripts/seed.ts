require("dotenv-flow").config();

import { client } from "../lib/mongodb";
import { deviceStore, gatewayStore } from "../src/stores";

async function run() {
    try {
        const gatewayCollection = await gatewayStore.collection;
        const devicesCollection = await deviceStore.collection;

        await gatewayCollection.deleteMany({});
        await devicesCollection.deleteMany({});

        const gateways = await gatewayCollection.insertMany([
            { serial_number: "01234567-89ABCDEF-01234567-19ABCDEF", name: "Gateway #1", ip_address: "192.168.1.1" },
            { serial_number: "01234567-89ABCDEF-01234567-29ABCDEF", name: "Gateway #2", ip_address: "192.168.1.2" },
        ]);

        console.log(gateways);

        const devices = await devicesCollection.insertMany([
            { uid: 123, vendor: "Vendor #1", created: new Date(), status: "online", gateway_id: gateways.insertedIds[0] },
            { uid: 124, vendor: "Vendor #1", created: new Date(), status: "offline", gateway_id: gateways.insertedIds[0] },
            { uid: 125, vendor: "Vendor #2", created: new Date(), status: "online", gateway_id: gateways.insertedIds[1] },
            { uid: 126, vendor: "Vendor #3", created: new Date(), status: "online" },
        ]);

        console.log(devices);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.log);
